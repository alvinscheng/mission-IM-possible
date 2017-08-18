import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const MessageBody = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  overflow: auto;
  padding: 10px 30px;
  height: calc(100vh - 50px);
`

const MessageInput = styled.div`
  position: fixed;
  margin: 20px;
  bottom: 0;
  width: calc(100% - 200px);
`

class Chat extends Component {
  constructor(props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const messageContainer = document.querySelector('.message-container')

    if (this.props.socket) {
      this.props.socket.on('chat-message', () => {
        // fetch('https://stark-meadow-83882.herokuapp.com/messages')
        fetch('http://localhost:3000/messages?room=' + this.props.room)
          .then(res => res.json())
          .then(data => {
            const loaded = data.messages.map(msg => {
              return { message: msg.message, username: msg.username }
            }).reverse()
            this.props.dispatch({
              type: 'LOADED_MESSAGES',
              payload: {
                messages: loaded
              }
            })
            messageContainer.scrollTop = messageContainer.scrollHeight
          })
      })
    }
    // fetch('https://stark-meadow-83882.herokuapp.com/messages')
    fetch('http://localhost:3000/messages')
      .then(res => res.json())
      .then(messages => {
        const loaded = messages.map(msg => {
          return { message: msg.message, username: msg.username }
        }).reverse()
        this.props.dispatch({
          type: 'LOADED_MESSAGES',
          payload: {
            messages: loaded
          }
        })
        messageContainer.scrollTop = messageContainer.scrollHeight
      })
  }

  handleChange(event) {
    const { value } = event.target
    this.props.dispatch({
      type: 'TYPED_MESSAGE',
      payload: { message: value }
    })
  }

  sendMessage(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const msg = {
      message: data.get('message'),
      username: this.props.user.username,
      roomId: this.props.room
    }
    this.props.socket.emit('chat-message', msg)
    this.props.dispatch({
      type: 'TYPED_MESSAGE',
      payload: { message: '' }
    })
    // fetch('https://stark-meadow-83882.herokuapp.com/messages', {
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      body: JSON.stringify(msg),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  render() {
    return (
      <div>
        <MessageBody className='message-container'>
          {
            this.props.messages.map((message, i) => {
              return <p key={i}>{ message.username }: { message.message }</p>
            })
          }
        </MessageBody>
        <MessageInput>
          <form className='form-inline text-center' onSubmit={ this.sendMessage }>
            <input
              type='text'
              name='message'
              className='form-control'
              onChange={ this.handleChange }
              value={ this.props.chatInput }/>
          </form>
        </MessageInput>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    user: state.user,
    chatInput: state.chatInput,
    room: state.room,
    socket: state.socket
  }
}

const Chatbox = connect(mapStateToProps)(Chat)

export default Chatbox

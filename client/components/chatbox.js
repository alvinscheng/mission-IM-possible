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
    if (this.props.socket) {
      this.props.socket.on('chat-message', msg => {
        this.props.dispatch({
          type: 'SENT_MESSAGE',
          payload: {
            username: msg.username,
            message: msg.message
          }
        })
        const messageContainer = document.querySelector('.message-container')
        messageContainer.scrollTop = messageContainer.scrollHeight
      })
    }
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
    this.props.socket.emit('chat-message', {
      message: data.get('message'),
      username: this.props.user.username
    })
    this.props.dispatch({
      type: 'TYPED_MESSAGE',
      payload: { message: '' }
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
    socket: state.socket
  }
}

const Chatbox = connect(mapStateToProps)(Chat)

export default Chatbox

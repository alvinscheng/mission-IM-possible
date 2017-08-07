import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../store'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.sendMessage = this.sendMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { value } = event.target
    this.setState({ value })
  }

  sendMessage(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    store.dispatch({
      type: 'SEND_MESSAGE',
      payload: { message: data.get('message') }
    })
    this.setState({ value: '' })
  }

  render() {
    return (
      <div>
        <div>
          {
            this.props.messages.map((message, i) => {
              return <p key={i}>User: {message}</p>
            })
          }
        </div>
        <form onSubmit={ this.sendMessage }>
          <input
            type='text'
            name='message'
            onChange={ this.handleChange }
            value={ this.state.value }/>
          <button type='submit'>Send</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    messages: state
  }
}

const Chatbox = connect(mapStateToProps)(Chat)

export default Chatbox

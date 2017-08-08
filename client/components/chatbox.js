/* global io */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../store'
import styled from 'styled-components'

const socket = io()

const Panel = styled.div`
  margin-top: 20px;
`

const PanelBody = styled.div`
  height: 200px;
  overflow: auto;
  padding-bottom: 35px;
`

const Button = styled.button`
  margin: 5px;
`

socket.on('chat message', message => {
  store.dispatch({
    type: 'SEND_MESSAGE',
    payload: { message }
  })
})

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
    socket.emit('chat message', data.get('message'))
    // const messageContainer = document.querySelector('.message-container')
    // messageContainer.scrollTop = messageContainer.scrollHeight
    this.setState({ value: '' })
  }

  render() {
    return (
      <Panel className='panel panel-default'>
        <PanelBody className='panel-body message-container'>
          {
            this.props.messages.map((message, i) => {
              return <p key={i}>User: {message}</p>
            })
          }
        </PanelBody>
        <div className='panel-footer'>
          <form className='form-inline text-center' onSubmit={ this.sendMessage }>
            <input
              type='text'
              name='message'
              className='form-control'
              onChange={ this.handleChange }
              value={ this.state.value }/>
            <Button className='btn btn-success btn-sm' type='submit'>Send</Button>
          </form>
        </div>
      </Panel>
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

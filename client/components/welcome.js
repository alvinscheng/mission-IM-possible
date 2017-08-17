import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const UserName = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #3498db;
  color: #ecf0f1;
  text-align: left;
  font-size: 16px;
  margin-bottom: 10px;
`
const Username = styled.div`
  font-size: 14px;
  margin: 5px;
  font-weight: bold;
`
const margin = { margin: '5px 5px 5px 10px' }

class Intro extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
    this.clickUser = this.clickUser.bind(this)
  }

  componentDidMount() {
    if (this.props.socket) {
      this.props.socket.on('new-user-login', users => {
        this.props.dispatch({
          type: 'ADDED_USER',
          payload: { users }
        })
      })
      this.props.socket.on('user-disconnected', username => {
        this.props.dispatch({
          type: 'REMOVED_USER',
          payload: { user: username }
        })
      })
    }
  }

  clickUser(user) {
    fetch('http://localhost:3000/messages?usernames=' + this.props.user.username + '+' + user)
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
        this.props.dispatch({
          type: 'ROOM_CHANGED',
          payload: { room: data.room }
        })
        const messageContainer = document.querySelector('.message-container')
        messageContainer.scrollTop = messageContainer.scrollHeight
      })
  }

  logOut() {
    this.props.dispatch({ type: 'LOGGED_OUT' })
    this.props.socket.disconnect()
    localStorage.removeItem('mission-IM-possible-jwtToken')
    localStorage.removeItem('mission-IM-possible-username')
  }

  render() {
    return (
      <div>
        <UserName>
          { this.props.user.username }
          <button
            type='button'
            className='btn btn-mini btn-negative'
            onClick={ this.logOut }
          >
            X
          </button>
        </UserName>
        <div style={ margin }>
          <Username onClick={ () => this.clickUser('user1') } >user1</Username>
          <Username onClick={ () => this.clickUser('user2') } >user2</Username>
          <Username onClick={ () => this.clickUser('user3') } >user3</Username>
          <Username onClick={ () => this.clickUser('user4') } >user4</Username>
          <Username onClick={ () => this.clickUser('user5') } >user5</Username>
          {
            this.props.userList.filter(user => {
              return user !== this.props.user.username
            })
            .map((user, i) => {
              return <Username key={ i } onClick={ this.clickUser } value={ user }>{ user }</Username>
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userList: state.userList,
    room: state.room,
    socket: state.socket
  }
}

const Welcome = connect(mapStateToProps)(Intro)

export default Welcome

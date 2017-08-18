import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const UserName = styled.li`
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

const active = {
  fontSize: '18px',
  color: '#3498db'
}

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
    if (user === 'group') {
      this.props.dispatch({
        type: 'ROOM_CHANGED',
        payload: {
          room: { room: 0, user: 'group' }
        }
      })
      fetch('https://stark-meadow-83882.herokuapp.com/messages?room=0')
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
          const messageContainer = document.querySelector('.message-container')
          messageContainer.scrollTop = messageContainer.scrollHeight
        })
    }
    else {
      fetch('https://stark-meadow-83882.herokuapp.com/messages?usernames=' + this.props.user.username + '+' + user)
        .then(res => res.json())
        .then(data => {
          this.props.dispatch({
            type: 'ROOM_CHANGED',
            payload: {
              room: { room: data.room, user }
            }
          })
          const loaded = data.messages.map(msg => {
            return { message: msg.message, username: msg.username }
          }).reverse()
          this.props.dispatch({
            type: 'LOADED_MESSAGES',
            payload: {
              messages: loaded
            }
          })

          const messageContainer = document.querySelector('.message-container')
          messageContainer.scrollTop = messageContainer.scrollHeight
        })
    }
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
        <ul className='list-group'>
          <Username
            className='list-group-item'
            onClick={ () => this.clickUser('group') }
            style={ (this.props.room.user === 'group') ? active : null}
          >Main</Username>
          {
            this.props.userList.filter(user => {
              return user !== this.props.user.username
            })
            .map((user, i) => {
              return <Username
                className='list-group-item'
                key={ i }
                onClick={ () => this.clickUser(user) }
                style={ (this.props.room.user === user) ? active : null }
              >
                { user }
              </Username>
            })
          }
        </ul>
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

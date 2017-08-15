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
  font-size: 16px;;
`
const margin = { margin: '5px 5px 5px 10px' }

class Intro extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    this.props.socket.on('new-user-login', username => {
      this.props.dispatch({
        type: 'REQUESTED_USERLIST',
        payload: { user: username }
      })
    })
  }

  logOut() {
    this.props.dispatch({ type: 'LOGGED_OUT' })
    this.props.dispatch({
      type: 'REMOVE_USER',
      payload: { user: this.props.user.username }
    })
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
          {
            this.props.userList.filter(user => {
              return user !== this.props.user.username
            })
            .map((user, i) => {
              return <div key={ i }>{ user }</div>
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
    socket: state.socket
  }
}

const Welcome = connect(mapStateToProps)(Intro)

export default Welcome

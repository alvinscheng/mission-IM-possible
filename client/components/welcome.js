import React, { Component } from 'react'
import { connect } from 'react-redux'

class Intro extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }

  logOut() {
    this.props.dispatch({ type: 'LOGGED_OUT' })
    localStorage.removeItem('mission-IM-possible-jwtToken')
    localStorage.removeItem('mission-IM-possible-username')
  }

  render() {
    return (
      <div>
        <h5>{ this.props.user.username }</h5>
        <div>
          {
            this.props.userList.map((user, i) => {
              return <div key={ i }>{ user }</div>
            })
          }
        </div>
        <button
          type='button'
          className='btn btn-form btn-default'
          onClick={ this.logOut }
        >
          Log Out
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userList: state.userList
  }
}

const Welcome = connect(mapStateToProps)(Intro)

export default Welcome

import React, { Component } from 'react'
import { connect } from 'react-redux'

class Intro extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }

  logOut() {
    this.props.dispatch({ type: 'LOGGED_OUT' })
  }

  render() {
    return (
      <div>
        <h5>{ this.props.user.username }</h5>
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
    user: state.user
  }
}

const Welcome = connect(mapStateToProps)(Intro)

export default Welcome

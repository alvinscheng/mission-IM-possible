import React, { Component } from 'react'
import { connect } from 'react-redux'

class Intro extends Component {
  render() {
    return (
      <div>
        <h5>{ this.props.user.username }</h5>
        <button
          type='button'
          className='btn btn-form btn-default'
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

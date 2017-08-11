import React, { Component } from 'react'
import { connect } from 'react-redux'

class Intro extends Component {
  render() {
    return (
      <h5>{ this.props.isLoggedIn.username }</h5>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const Welcome = connect(mapStateToProps)(Intro)

export default Welcome

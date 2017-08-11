import React, { Component } from 'react'
import { connect } from 'react-redux'

class Intro extends Component {
  render() {
    return (
      <h5>{ this.props.user.username }</h5>
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

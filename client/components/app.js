import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chatbox from './chatbox'
import SignupForm from './sign-up'
import Welcome from './welcome'

const margin = { margin: '20px' }

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  componentDidMount() {
    if (localStorage.getItem('jwtToken')) this.props.dispatch({ type: 'LOG_IN' })
  }

  render() {
    return (
      <div className='window'>
        <div className='window-content'>
          <div className='pane-group'>
            <div className='pane-sm sidebar'>
              <div style={ margin }>
                {(!this.props.isLoggedIn) ? <SignupForm /> : <Welcome />}
              </div>
            </div>
            <div className='pane'>
              <Chatbox />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const App = connect(mapStateToProps)(Main)

export default App

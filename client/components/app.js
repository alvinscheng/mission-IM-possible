import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chatbox from './chatbox'
import SignupForm from './sign-up'
import LoginForm from './log-in'
import Welcome from './welcome'

const margin = { margin: '20px' }

class Main extends Component {
  render() {
    return (
      <div className='window'>
        <div className='window-content'>
          <div className='pane-group'>
            <div className='pane-sm sidebar'>
              <div style={ margin }>
                <LoginForm />
                {/* {(!this.props.user.isLoggedIn) ? <SignupForm /> : <Welcome />} */}
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
    user: state.user
  }
}

const App = connect(mapStateToProps)(Main)

export default App

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
                {(this.props.user.isLoggedIn)
                  ? <Welcome />
                  : (this.props.components.find(val => {
                    return val === 'SignupForm'
                  }))
                    ? <SignupForm />
                  : <LoginForm />
                }
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
    user: state.user,
    components: state.components,
    userList: state.userList
  }
}

const App = connect(mapStateToProps)(Main)

export default App

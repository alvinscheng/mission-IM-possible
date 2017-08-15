import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chatbox from './chatbox'
import SignupForm from './sign-up'
import LoginForm from './log-in'
import Welcome from './welcome'
import styled from 'styled-components'

const margin = { margin: '20px' }

const EntryPoint = styled.div`
  font-family: 'Open Sans', sans-serif;
  position: fixed;
  width: 200px;
  height: 200px;
  top: 40%;
  left: 50%;
  margin: -75px 0 0 -75px;
  border: 2px solid #bdc3c7;
  border-radius: 4px;
  text-align: center;
  background-color: #ecf0f1;
`

class Main extends Component {
  render() {
    return (
      <div className='window'>
        <div className='window-content'>
          <div className='pane-group'>
            <div className='pane-sm sidebar'>
              <div>
                {
                  (this.props.user.isLoggedIn)
                  ? <Welcome />
                  : null
                }
              </div>
            </div>
            <div className='pane'>
              <Chatbox />
                {(this.props.user.isLoggedIn)
                  ? null
                  : <EntryPoint>
                    {
                      (this.props.components.find(val => {
                        return val === 'SignupForm'
                      }))
                        ? <SignupForm />
                      : <LoginForm />
                    }
                  </EntryPoint>
                }
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

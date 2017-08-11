import React from 'react'
import Chatbox from './chatbox'
import SignupForm from './sign-up'
import Welcome from './welcome'

const margin = { margin: '20px' }

const App = () => {
  return (
    <div className='window'>
      <div className='window-content'>
        <div className='pane-group'>
          <div className='pane-sm sidebar'>
            <div style={ margin }>
              {(localStorage.getItem('username') === 'undefined') ? <SignupForm /> : <Welcome />}
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

export default App

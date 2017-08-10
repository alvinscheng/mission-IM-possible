import React from 'react'
import Chatbox from './chatbox'
import SignupForm from './sign-up'

const App = () => {
  return (
    <div className='window'>
      <div className='window-content'>
        <div className='pane-group'>
          <div className='pane-sm sidebar'>
            <SignupForm />
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

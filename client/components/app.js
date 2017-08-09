import React from 'react'
import Chatbox from './chatbox'

const App = () => {
  return (
    <div className='window'>
      <div className='window-content'>
        <div className='pane-group'>
          <div className='pane'>
            <Chatbox />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

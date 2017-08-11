import React from 'react'

const Welcome = () => {
  return (
    <h5>{ localStorage.getItem('username') }</h5>
  )
}

export default Welcome

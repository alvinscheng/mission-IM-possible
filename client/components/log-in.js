import React from 'react'
import { Form, Text } from 'react-form'
import { store, socket } from '../store'

const LoginForm = () => {
  return (
    <Form
      onSubmit={data => {
        fetch('https://stark-meadow-83882.herokuapp.com/authenticate', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            localStorage.setItem('mission-IM-possible-jwtToken', data.token)
            localStorage.setItem('mission-IM-possible-username', data.username)
            socket.emit('new-user-login', data.username)
            store.dispatch({
              type: 'LOGGED_IN',
              payload: {
                username: data.username,
                token: data.token
              }
            })
            return data.username
          }
          else {
            alert(data.error)
          }
        })
        .then(username => {
          store.dispatch({
            type: 'REQUEST_USERLIST',
            payload: { user: username }
          })
        })
        .catch(err => {
          console.log(err)
        })
      }}
    >
      {({submitForm}) => {
        return (
          <form onSubmit={ submitForm }>
            <label>
              <span>Username:</span>
              <Text
                field='username'
                className='form-control'
              />
            </label>
            <label>
              <span>Password:</span>
              <Text
                field='password'
                type='password'
                className='form-control'
              />
            </label>
            <button
              type='submit'
              className='btn btn-form btn-default'
            >
              Log In
            </button>
            <p>New here? <a href='#' onClick={() => {
              store.dispatch({
                type: 'DISPLAYED_COMPONENT',
                payload: { component: 'SignupForm' }
              })
            }}>Create an account!</a></p>
          </form>
        )
      }}
    </Form>
  )
}

export default LoginForm

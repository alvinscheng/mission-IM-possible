import React from 'react'
import { Form, Text } from 'react-form'
import store from '../store'

const LoginForm = () => {
  return (
    <Form
      onSubmit={data => {
        // fetch('https://stark-meadow-83882.herokuapp.com/register', {
        fetch('http://localhost:3000/authenticate', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('mission-IM-possible-jwtToken', data.token)
          localStorage.setItem('mission-IM-possible-username', data.username)
          store.dispatch({
            type: 'LOGGED_IN',
            payload: {
              username: data.username,
              token: data.token
            }
          })
        })
        .catch(err => {
          console.log(err)
          alert('Username already taken.')
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
          </form>
        )
      }}
    </Form>
  )
}

export default LoginForm

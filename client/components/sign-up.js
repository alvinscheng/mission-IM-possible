import React from 'react'
import { Form, Text } from 'react-form'
import { store, createConnection } from '../store'

const SignupForm = props => {
  return (
    <Form
      onSubmit={data => {
        fetch('https://stark-meadow-83882.herokuapp.com/register', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            localStorage.setItem('mission-IM-possible-jwtToken', data.token)
            localStorage.setItem('mission-IM-possible-username', data.username)
            let socket = createConnection()
            store.dispatch({
              type: 'SOCKET_CONNECTED',
              payload: {socket}
            })
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
        .then(() => {
          store.dispatch({
            type: 'HID_COMPONENT',
            payload: { component: 'SignupForm' }
          })
        })
        .catch(err => {
          console.log(err)
        })
      }}
      validate={({ username, password }) => {
        return {
          username: !username ? 'A username is required' : null,
          password: (!password || password.length < 6)
          ? 'Must include 6+ characters'
          : (!password.match(/(?=.*\d)(?=.*[a-zA-Z])/))
          ? ((!password.match(/[a-zA-Z]/)) ? 'Must include a letter' : 'Must include a number')
            : null
        }
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
              Create Account
            </button>
            <p>Already a member? <a href='#' onClick={() => {
              store.dispatch({
                type: 'HID_COMPONENT',
                payload: { component: 'SignupForm' }
              })
            }}>Log In!</a></p>
          </form>
        )
      }}
    </Form>
  )
}

export default SignupForm

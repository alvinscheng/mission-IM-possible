import React from 'react'
import { Form, Text } from 'react-form'
import store from '../store'

const SignupForm = () => {
  return (
    <Form
      onSubmit={data => {
        // fetch('https://stark-meadow-83882.herokuapp.com/register', {
        fetch('http://localhost:3000/register', {
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
        .then(() => {
          store.dispatch({ type: 'HID_SIGNUP' })
        })
        .catch(err => {
          console.log(err)
          alert('Username already taken.')
        })
      }}
      validate={({ username, password }) => {
        return {
          username: !username ? 'A username is required' : null,
          password: (!password || password.length < 6)
          ? 'A password of 6 or more characters is required'
          : (!password.match(/(?=.*\d)(?=.*[a-zA-Z])/))
            ? 'Password must include at least 1 letter and 1 number'
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
          </form>
        )
      }}
    </Form>
  )
}

export default SignupForm

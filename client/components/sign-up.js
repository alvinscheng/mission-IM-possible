import React from 'react'
import { Form, Text } from 'react-form'

const SignupForm = () => {
  return (
    <Form
      onSubmit={(values) => {
        console.log('Success!', values)
      }}
      validate={({ username, password }) => {
        return {
          username: !username ? 'A username is required' : null,
          password: (!password || password.length < 6)
          ? 'A password of 6 or more characters is required'
          : (!password.match(/(?=.*\d)(?=.*[a-z])/))
            ? 'Password must include at least 1 letter and 1 number'
            : null
        }
      }}
    >
      {({submitForm}) => {
        return (
          <form onSubmit={submitForm}>
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

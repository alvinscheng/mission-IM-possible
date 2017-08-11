import reducer from '../client/reducer'
const { describe, it } = require('mocha')
const { expect } = require('chai')

describe('reducer', () => {

  describe('SEND_MESSAGE', () => {
    it('changes the language', () => {
      const oldState = { messages: [], isLoggedIn: false }
      const action = {
        type: 'SEND_MESSAGE',
        payload: {
          message: 'Hello World'
        }
      }
      const newState = reducer(oldState, action)
      expect(newState.messages).to.be.an('array').with.length.above(0)
    })
  })

  describe('LOG_IN', () => {
    it('Logs in a user', () => {
      const oldState = { messages: [], isLoggedIn: false }
      const action = { type: 'LOG_IN' }
      const newState = reducer(oldState, action)
      expect(newState.isLoggedIn).to.equal(true)
    })
  })

  describe('DEFAULT', () => {
    it('defaults', () => {
      const oldState = { messages: ['Hello', 'World'], isLoggedIn: false }
      const action = { type: 'DEFAULT' }
      const newState = reducer(oldState, action)
      expect(newState).to.deep.equal(oldState)
    })
  })

})

import reducer from '../client/reducer'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('reducer', () => {

  describe('SENT_MESSAGE', () => {
    it('changes the language', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        }
      }
      const action = {
        type: 'SENT_MESSAGE',
        payload: {
          message: 'Hello World'
        }
      }
      const newState = reducer(oldState, action)
      expect(newState.messages).to.be.an('array').with.length.above(0)
    })
  })

  describe('TYPED_MESSAGE', () => {
    it('changes the language', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        },
        chatInput: ''
      }
      const action = {
        type: 'TYPED_MESSAGE',
        payload: {
          message: 'H'
        }
      }
      const newState = reducer(oldState, action)
      expect(newState.chatInput).to.be.a('string')
      expect(newState.chatInput).to.equal('H')
    })
  })

  describe('LOGGED_IN', () => {
    it('Logs in a user', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        }
      }
      const action = {
        type: 'LOGGED_IN',
        payload: {
          username: 'username',
          token: 'TOKEN'
        }
      }
      const newState = reducer(oldState, action)
      expect(newState.user).to.be.an('object')
      expect(newState.user.isLoggedIn).to.equal(true)
      expect(newState.user.username).to.equal('username')
      expect(newState.user.token).to.equal('TOKEN')
    })
  })

  describe('DEFAULT', () => {
    it('defaults', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        },
        chatInput: ''
      }
      const action = { type: 'DEFAULT' }
      const newState = reducer(oldState, action)
      expect(newState).to.deep.equal(oldState)
    })
  })

})

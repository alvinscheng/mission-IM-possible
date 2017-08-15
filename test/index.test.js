import reducer from '../client/reducer'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('reducer', () => {

  describe('SENT_MESSAGE', () => {
    it('Adds a new message to the chat', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        },
        chatInput: '',
        components: []
      }
      const action = {
        type: 'SENT_MESSAGE',
        payload: {
          message: 'Hello World',
          username: 'user1'
        }
      }
      const newState = reducer(oldState, action)
      expect(newState.messages).to.be.an('array').with.length.above(0)
    })
  })

  describe('LOGGED_IN', () => {
    it('logs in a user', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        },
        chatInput: '',
        components: []
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

  describe('LOGGED_OUT', () => {
    it('logs out a user', () => {
      const oldState = {
        messages: [],
        user: {
          username: 'user1',
          token: 'TOKEN',
          isLoggedIn: true
        },
        chatInput: '',
        components: []
      }
      const action = { type: 'LOGGED_OUT' }
      const newState = reducer(oldState, action)
      expect(newState.user).to.be.an('object')
      expect(newState.user.isLoggedIn).to.equal(false)
      expect(newState.user.username).to.equal('')
      expect(newState.user.token).to.equal('')
    })
  })

  describe('TYPED_MESSAGE', () => {
    it('updates the chat input', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        },
        chatInput: '',
        components: []
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

  describe('DISPLAYED_COMPONENT', () => {
    it('adds a component to the state', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        },
        chatInput: '',
        components: []
      }
      const action = {
        type: 'DISPLAYED_COMPONENT',
        payload: { component: 'SignupForm' }
      }
      const newState = reducer(oldState, action)
      expect(newState.components).to.be.an('array').with.length.above(0)
    })
  })

  describe('HID_COMPONENT', () => {
    it('removes a component from the state', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        },
        chatInput: '',
        components: ['SignupForm']
      }
      const action = {
        type: 'HID_COMPONENT',
        payload: { component: 'SignupForm' }
      }
      const newState = reducer(oldState, action)
      expect(newState.messages).to.be.an('array').with.length(0)
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
        chatInput: '',
        components: [],
        userList: []
      }
      const action = { type: 'DEFAULT' }
      const newState = reducer(oldState, action)
      expect(newState).to.deep.equal(oldState)
    })
  })

})

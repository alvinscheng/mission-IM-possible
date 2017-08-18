import reducer from '../client/reducer'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('reducer', () => {

  describe('LOADED_MESSAGES', () => {
    it('Loads all messages to the chat', () => {
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
        type: 'LOADED_MESSAGES',
        payload: {
          messages: [
            { message: 'Hello', username: 'user1' },
            { message: 'World', username: 'user2' }
          ]
        }
      }
      const newState = reducer(oldState, action)
      expect(newState.messages).to.be.an('array').with.length(2)
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

  describe('ADDED_USER', () => {
    it('updates the user list based off connected sockets', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        },
        chatInput: '',
        components: ['SignupForm'],
        userList: ['user1']
      }
      const action = {
        type: 'ADDED_USER',
        payload: {
          users: ['user1', 'user2']
        }
      }
      const newState = reducer(oldState, action)
      expect(newState.userList).to.be.an('array').with.length(2)
      expect(newState.userList[1]).to.equal('user2')
    })
  })

  describe('REMOVED_USER', () => {
    it('removes a user from the user list', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        },
        chatInput: '',
        components: ['SignupForm'],
        userList: ['user1', 'user2']
      }
      const action = {
        type: 'REMOVED_USER',
        payload: { user: 'user2' }
      }
      const newState = reducer(oldState, action)
      expect(newState.userList).to.be.an('array').with.length(1)
      expect(newState.userList[0]).to.equal('user1')
    })
  })

  describe('ROOM_CHANGED', () => {
    it('changes the room', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        },
        chatInput: '',
        components: [],
        userList: [],
        room: 0,
        socket: {}
      }
      const action = {
        type: 'ROOM_CHANGED',
        payload: { room: 1 }
      }
      const newState = reducer(oldState, action)
      expect(newState.room).to.equal(1)
    })
  })

  describe('SOCKET_CONNECTED', () => {
    it('connects a socket', () => {
      const oldState = {
        messages: [],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        },
        chatInput: '',
        components: [],
        userList: [],
        socket: {}
      }
      const action = {
        type: 'SOCKET_CONNECTED',
        payload: { socket: true }
      }
      const newState = reducer(oldState, action)
      expect(newState.socket).to.equal(true)
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
        userList: [],
        room: 'group',
        socket: {}
      }
      const action = { type: 'DEFAULT' }
      const newState = reducer(oldState, action)
      expect(newState).to.deep.equal(oldState)
    })
  })

})

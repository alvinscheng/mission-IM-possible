import reducer from '../client/reducer'
import { describe, it, before, after } from 'mocha'
import { expect } from 'chai'
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { JSDOM } from 'jsdom'
import configureStore from 'redux-mock-store'
import Chatbox from '../client/components/chatbox'
import Welcome from '../client/components/welcome'

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

  describe('LOGGED_IN', () => {
    it('Logs in a user', () => {
      const oldState = {
        messages: ['Hello', 'World'],
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
        messages: ['Hello', 'World'],
        user: {
          username: '',
          token: '',
          isLoggedIn: false
        }
      }
      const action = { type: 'DEFAULT' }
      const newState = reducer(oldState, action)
      expect(newState).to.deep.equal(oldState)
    })
  })

})

describe('React Components', () => {

  const mockStore = configureStore(reducer)
  const oldState = {
    messages: [],
    user: {
      username: '',
      token: '',
      isLoggedIn: false
    }
  }
  const store = mockStore(oldState)

  describe('<Chatbox />', () => {

    before(() => {
      global.window = new JSDOM().window
      global.document = window.document
    })

    after(() => {
      global.document = undefined
      global.window = undefined
    })

    it('should render a .message-container', () => {
      const wrapper = mount(
        <Provider store={ store }>
          <Chatbox />
        </Provider>
      )
      expect(wrapper.find('.message-container')).to.have.length(1)
    })

    it('', () => {

    })

  })

  describe('<Welcome />', () => {

    before(() => {
      global.window = new JSDOM().window
      global.document = window.document
    })

    after(() => {
      global.document = undefined
      global.window = undefined
    })

    it('does something', () => {
      const wrapper = mount(
        <Provider store={ store }>
          <Welcome />
        </Provider>
      )
      expect(wrapper.find('h5')).to.have.length(1)
    })

  })

})

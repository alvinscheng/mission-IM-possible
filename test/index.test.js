import reducer from '../client/reducer'
const { describe, it } = require('mocha')
const { expect } = require('chai')

describe('reducer', () => {

  describe('SEND_MESSAGE', () => {
    it('changes the language', () => {
      const oldState = []
      const action = {
        type: 'SEND_MESSAGE',
        payload: {
          message: 'Hello World'
        }
      }
      const newState = reducer(oldState, action)
      expect(newState).to.be.an('array')
    })
  })

  describe('DEFAULT', () => {
    it('defaults', () => {
      const oldState = ['Hello', 'World']
      const action = { type: 'DEFAULT' }
      const newState = reducer(oldState, action)
      expect(newState).to.deep.equal(oldState)
    })
  })
})

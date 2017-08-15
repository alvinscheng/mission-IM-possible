import { createStore } from 'redux'
import reducer from './reducer'
import io from 'socket.io-client'

const token = (localStorage.getItem('mission-IM-possible-jwtToken') ? localStorage.getItem('mission-IM-possible-jwtToken') : '')
const username = (localStorage.getItem('mission-IM-possible-username') ? localStorage.getItem('mission-IM-possible-username') : '')
const isLoggedIn = !!token

function createConnection() {
  const socket = io('http://localhost:3000', {
    path: '/api/connect',
    'query': 'token=' + localStorage.getItem('mission-IM-possible-jwtToken')
  })
  return socket
}

const store = createStore(reducer, { components: [], user: { token, username, isLoggedIn }, socket: createConnection() })

module.exports = { store, createConnection }

import { createStore } from 'redux'
import reducer from './reducer'
import io from 'socket.io-client'

const token = (localStorage.getItem('mission-IM-possible-jwtToken') ? localStorage.getItem('mission-IM-possible-jwtToken') : '')
const username = (localStorage.getItem('mission-IM-possible-username') ? localStorage.getItem('mission-IM-possible-username') : '')
const isLoggedIn = !!token
let socket

const socketInit = () => {
  socket = io('https://stark-meadow-83882.herokuapp.com', {
    path: '/api/connect',
    'query': 'token=' + localStorage.getItem('mission-IM-possible-jwtToken')
  })
  return socket
}

if (isLoggedIn) {
  socketInit()
}

const store = createStore(reducer, { components: [], user: { token, username, isLoggedIn }, userList: [] })

module.exports = { store, socketInit }

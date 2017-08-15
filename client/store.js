import { createStore } from 'redux'
import reducer from './reducer'
import io from 'socket.io-client'

const token = (localStorage.getItem('mission-IM-possible-jwtToken') ? localStorage.getItem('mission-IM-possible-jwtToken') : '')
const username = (localStorage.getItem('mission-IM-possible-username') ? localStorage.getItem('mission-IM-possible-username') : '')
const isLoggedIn = !!token

const socket = io('https://stark-meadow-83882.herokuapp.com', {
  path: '/api/connect',
  'query': 'token=' + localStorage.getItem('mission-IM-possible-jwtToken')
})

const store = createStore(reducer, { components: [], user: { token, username, isLoggedIn } })

module.exports = { store, socket }

import io from 'socket.io-client'

const socket = io('https://stark-meadow-83882.herokuapp.com', {
  path: '/api/connect',
  'query': 'token=' + localStorage.getItem('mission-IM-possible-jwtToken')
})

export default socket

require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
  socket.on('chat message', msg => {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })
})

const port = process.env.PORT || 3000
server.listen(port, () => console.log('Listening on ' + port))

require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 3000

server.listen(port, () => console.log('Listening on ' + port))

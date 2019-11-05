require('dotenv').config()
const express = require('express')
// const sessions = require('express-session')
const {SERVER_PORT} = process.env
const ctrl = require('./messagesCtrl')

const app = express()

//middleware

//endpoints
app.get('/api/messages', ctrl.getAllMessages)

//listening
app.listen(SERVER_PORT, console.log(`testing, testing, port ${SERVER_PORT}`))
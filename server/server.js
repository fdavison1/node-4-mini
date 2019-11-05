require('dotenv').config()
const express = require('express')
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET} = process.env
const ctrl = require('./messagesCtrl')

const app = express()

//middleware
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))
app.use((req, res, next) => {
    let badWords = ['knucklehead', 'jerk', 'internet explorer']
    if (req.body.message){
        for (let i = 0; i < badWords.length; i++){
            let regex = new RegExp(badWords[i], 'g')
            req.body.message = req.body.message.replace(regex, '****')
        }
        next()
    } else {
        next()
    }
})

//endpoints
app.get('/api/messages', ctrl.getAllMessages)
app.post('/api/messages', ctrl.createMessage)
app.get('/api/messages/history', ctrl.history)

//listening
app.listen(SERVER_PORT, console.log(`testing, testing, port ${SERVER_PORT}`))
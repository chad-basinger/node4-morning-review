const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require ('./ctrl/authController')
const middleware = require('./middleware')


const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(cors())

app.use(session({
    resave: false,
    secret: SESSION_SECRET,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 14}
}))

app.post('/auth/register', middleware.checkUsername, authCtrl.register)
app.post('/auth/login', middleware.checkUsername, authCtrl.login)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log(`db is LIVE FROM NEW YORK`)
    app.listen(SERVER_PORT, () => console.log(`server is crackle lackin on port ${SERVER_PORT}`))
})
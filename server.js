const express = require('express')
const cors = require('cors')
const passport = require('passport')
const router = require('./routes/index')
require('dotenv').config()
const path = require('path')

require('./config/dataBase')
require('./config/passport')

const app = express()

/* Middlewares */
app.use(cors())
app.use(express.json())

app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+"/client/build/index.html"))
    })
}

app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0', () => console.log('Server listening'))
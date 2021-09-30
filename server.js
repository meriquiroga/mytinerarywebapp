const express = require('express')
const cors = require('cors')
const passport = require('passport')
const router = require('./routes/index')
require('dotenv').config()
require('./config/dataBase')
require('./config/passport')


const app = express()

/* Middlewares */
app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(4000, console.log('Server escuchando'))
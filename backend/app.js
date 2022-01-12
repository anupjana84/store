const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const dbConnection = require('./config/db')

//db connection

const homeRouter = require('./routes/route')
const user = require('./routes/user')
const errorController = require('./utils/errorController')
//server run
app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
)
//app connect db
dbConnection()

//========

//routes
app.use('/api', homeRouter)
app.use('/api', user)

app.use(errorController)

module.exports = app

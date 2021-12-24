const config = require('./utils/config')

// import {config} from './utils/config'
import express from 'express'
import mongoose from 'mongoose'
const app = express()
require('express-async-errors')
import cors from 'cors'
// import notesRouter from './controllers/notes'
// import usersRouter from './controllers/users'
import loginRouter from './controllers/login'
// import middleware from './utils/middleware'
import logger from './utils/logger'

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(middleware.requestLogger)

// app.use('/api/notes', notesRouter)
// app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// if (process.env.NODE_ENV === 'test') {
//   const testingRouter = require('./controllers/testing')
//   app.use('/api/testing', testingRouter)
// }

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

export default app
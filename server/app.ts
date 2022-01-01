/* eslint-disable @typescript-eslint/no-misused-promises */
import config from './utils/config'
import express from 'express'
import mongoose from 'mongoose'
const app = express()
require('express-async-errors')
import cors from 'cors'

import usersRouter from './controllers/users'
import landfillRouter from './controllers/landfills'
import regionRouter from './controllers/regions'
import loginRouter from './controllers/login'
import driverRouter from './controllers/drivers'
import orderRouter from './controllers/orders'
import middleware from './utils/middleware'
import logger from './utils/logger'

logger.info('connecting to', config.MONGODB_URI)

if (config.MONGODB_URI) {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(() => {
            logger.info('connected to MongoDB')
        })
        .catch((error) => {
            logger.error('error connection to MongoDB:', error.message)
        })
}


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)


app.use('/regions', middleware.userExtractor,regionRouter)
app.use('/landfills', middleware.userExtractor,landfillRouter)
app.use('/drivers', middleware.userExtractor,driverRouter)
app.use('/orders', middleware.userExtractor,orderRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)

// if (process.env.NODE_ENV === 'test') {
//   const testingRouter = require('./controllers/testing')
//   app.use('/api/testing', testingRouter)
// }



app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app
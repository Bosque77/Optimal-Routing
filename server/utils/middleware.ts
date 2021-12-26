import logger from './logger'
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const requestLogger = (req:any, _res:any, next:any) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_req:any, res:any) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error:any, _request:any, response:any, next:any) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
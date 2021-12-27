/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import logger from './logger'
import User from '../models/user'
import jwt from 'jsonwebtoken'
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


const tokenExtractor= (request:any,_response:any,next:any) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request['token'] = authorization.substring(7)
    }
    next()
}

const userExtractor  = async (request:any,response:any,next:any) => {
    const token = request.token as string
    // eslint-disable-next-line no-undef
    if(process.env.SECRET){
        const decodedToken= jwt.verify(token, process.env.SECRET) as any
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        request['user'] = user
    }
    next()
}

export default {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
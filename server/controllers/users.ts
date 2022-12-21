
import express from 'express'
import {Request, Response} from 'express'
import userService from '../services/userService'
import asyncHandler from 'express-async-handler'
import * as z from 'zod'
import { ERROR_CODES } from '../utils/errors'


const usersRouter = express.Router()


const userSchema = z.object({
    username: z.string(),
    password: z.string(),
})

// returns all users
usersRouter.get('/', asyncHandler(async (_request: Request, response:Response) => {
    const users = await  userService.getAllUsers()
    response.json(users)
}))

// returns a user by id
usersRouter.get('/:id', asyncHandler(async (request:Request, response:Response) => {
    const the_user = await userService.getUserById(request.params.id)
    if (the_user) {
        response.json(the_user)
    } else {
        throw {
            name: 'UserNotFound'
        }
    }
}))


// creates a new user
usersRouter.post('/', asyncHandler(async (request:Request, response:Response) => {
    const user_data = userSchema.parse(request.body)
    const username = user_data.username
    const password = user_data.password

    if (!(username && password)) {
        throw{
            name: ERROR_CODES.USER_CREATION_ERROR,
            message: 'Username and password are required'
        }
    } else if (password.length < 3 || username.length < 3) {
        throw{
            name: ERROR_CODES.USER_CREATION_ERROR,
            message: 'Username and password must be at least 3 characters long'
        }
    }
    else {
        const savedUser = await userService.createUser(username, password)
        response.json(savedUser)
    }

}))


export default usersRouter
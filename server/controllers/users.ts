
import express from 'express'
import {Request, Response} from 'express'
import userService from '../services/userService'
import asyncHandler from 'express-async-handler'


const usersRouter = express.Router()

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
usersRouter.post('/', async (request:Request, response:Response) => {
    const user_data = request.body
    const username = user_data.username
    const password = user_data.password

    if (!(username && password)) {
        response.status(401).json({
            error: 'make sure you entered a username, name, and password'
        })
    } else if (password.length < 3 || username.length < 3) {
        response.status(401).json({
            error: 'password and username must be greater than 3 characters'
        })
    }
    else {
        const savedUser = await userService.createUser(username, password)
        response.json(savedUser)
    }

})


export default usersRouter
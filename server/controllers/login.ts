import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import config from '../utils/config'
import userService from '../services/userService'
import * as z from 'zod'
import asyncHandler from 'express-async-handler'
import { ERROR_CODES } from '../utils/errors'


const userSchema = z.object({
    username: z.string(),
    password: z.string(),
})

const loginRouter = express.Router()


// login for the user
loginRouter.get('/', asyncHandler(async (request: Request, response: Response) => {


    const user_data = userSchema.parse(request.body)
    const username = user_data.username
    const password = user_data.password


    const user = await userService.getUserByUsername(username)

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      throw {
        name: ERROR_CODES.LOGIN_ERROR,
      }
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    if (config.SECRET) {
        const token = jwt.sign(userForToken, config.SECRET)
        response.status(200).send({ token, username: user.username})
    }

}))



export default loginRouter
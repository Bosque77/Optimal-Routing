/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/user'
import config from '../utils/config'

interface NewUser {
  _id: string,
  username: string,
  passwordHash: string
}


const loginRouter = express.Router()


// eslint-disable-next-line @typescript-eslint/no-misused-promises
loginRouter.post('/', async (req, res) => {
    console.log('inside user post')
    const body = req.body

    const user = await User.findOne({ username: body.username }) as unknown as NewUser
    console.log('found user')
    console.log(user)
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }


    if (config.SECRET) {
        const token = jwt.sign(userForToken, config.SECRET)
        res
            .status(200)
            .send({ token, username: user.username})

    }

})



export default loginRouter
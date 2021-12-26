import bcrypt from 'bcrypt'
import express from 'express';
import User from '../models/user'

const usersRouter = express.Router()

usersRouter.get('/', async (_request, response) => {
    console.log('inside get users')
    const Users = await User.find({})
    response.json(Users.map((User: { toJSON: () => any; }) => User.toJSON()))
})

usersRouter.get('/:id', async (request, response) => {
    const the_user = await User.findById(request.params.id)
    if (the_user) {
        response.json(the_user.toJSON())
    } else {
        response.status(404).end()
    }
})

usersRouter.post('/', async (request, response) => {
    let user_data = request.body
    let username = user_data.username
    let password = user_data.password

  

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
        console.log('before the salt rounds')
        let salt_rounds = 10
        let passwordHash = await bcrypt.hash(password, salt_rounds)
        console.log('before declaration of user')
        const user = new User({
            username,
            passwordHash,
        })
        console.log(user)


        const savedUser = await user.save()

        console.log('logging the saved user')
        console.log(savedUser)

        response.json(savedUser)


    }

})


export default usersRouter
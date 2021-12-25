import mongoose from 'mongoose'
import config from './utils/config'
import logger from './utils/logger'
import { User } from './models/user'
// import bcrypt from 'bcrypt'




const users = [
  {
    "username": "user_1",
    "password": "password123",
    "passwordHash": "$2b$10$drQ3m/uP5sejRRlfHNwNfu4Esxec454XqrE9j6ivWG8E/pYa4HF1u",
    "id": "61c7483607e4533869b9ec08"
  },
  {
    "username": "user_2",
    "password": "password1234",
    "passwordHash": "$2b$10$//cykx4aefD9n4YOKYB7kuFGGoHto3izcLWxvmgyZSc0GnAIf8Oh6",
    "id": "61c7483607e4533869b9ec09"
  }]


// const saltRounds = 10


// const createPasswordHash = async(password:string, saltRounds: number) => {
//     const password_hash = await bcrypt.hash(password, saltRounds)
//     return password_hash
// }



const initUsers = async() =>{
  if (config.MONGODB_URI) {
    await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
      .then(() => {
        logger.info('connected to MongoDB')
      })
      .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
      })
  }

    await User.deleteMany({})

    const user_objects = users.map(user => new User({_id:user.id, username: user.username, passwordHash: user.passwordHash}) )
    const promise_array = user_objects.map(user => user.save())
    await Promise.all(promise_array)


    mongoose.disconnect()

  }





initUsers()


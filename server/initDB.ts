import mongoose from 'mongoose'
import config from './utils/config'
import logger from './utils/logger'
import { User } from './models/user'


const submitUser = async() =>{
    let new_user = new User({username: 'forest', password:'test123'})

    let returned_user = await new_user.save()
    mongoose.disconnect()
    
    console.log(returned_user)
  }


if (config.MONGODB_URI) {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
      .then(() => {
        logger.info('connected to MongoDB')
      })
      .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
      })
  }


submitUser()


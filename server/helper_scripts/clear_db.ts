import config from '../utils/config'


import mongoose from 'mongoose'

import Order from '../models/order-model'


const connectMongoose = async () => {
    if (config.MONGODB_URI) {
        await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
            .then(() => {
               console.log('connected to MongoDB')
            })
            .catch((error) => {
                console.log('error connection to MongoDB:', error.message)
            })
    }
}

const clearDB = async () => {
    await connectMongoose()
    await Order.deleteMany({})
    console.log('DB cleared')
    mongoose.connection.close()
}

clearDB()


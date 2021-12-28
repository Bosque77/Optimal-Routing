/* eslint-disable @typescript-eslint/no-floating-promises */
import mongoose from 'mongoose'
import config from './utils/config'
import logger from './utils/logger'
import User from './models/user'
import Region from './models/region'
import Landfill from './models/landfill'
// import bcrypt from 'bcrypt'
import { NewLandfill } from './types'



const users = [
    {
        'username': 'user_1',
        'password': 'password123',
        'passwordHash': '$2b$10$drQ3m/uP5sejRRlfHNwNfu4Esxec454XqrE9j6ivWG8E/pYa4HF1u',
        '_id': '61c7483607e4533869b9ec08'
    },
    {
        'username': 'user_2',
        'password': 'password1234',
        'passwordHash': '$2b$10$//cykx4aefD9n4YOKYB7kuFGGoHto3izcLWxvmgyZSc0GnAIf8Oh6',
        '_id': '61c7483607e4533869b9ec09'
    }
]

const regions = [
    {

        'name': 'Default',
        'user_id': '61c7483607e4533869b9ec08',
        '_id': '61ca3cb19e9ade7351418e30'
    },
    {

        'name': 'Atlanta',
        'user_id': '61c7483607e4533869b9ec08',
        '_id': '61ca3cb19e9ade7351418e31'
    },
    {
        'name': 'Woodstock',
        'user_id': '61c7483607e4533869b9ec08',
        '_id': '61ca3cb19e9ade7351418e32'
    }
]

const landfills: NewLandfill[] = [
    {
        'name': 'The Mega Complex',
        'street': '4703 Cambridge Dr.',
        'city': 'Sandy Springs',
        'state': 'Georgia',
        'zipcode': 30338,
        'latitude': 33.935,
        'longitude': -84.318,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
    },
    {
        'name': 'Flat Shoals',
        'street': '470 Flat Shoals Ave',
        'city': 'Atlanta',
        'state': 'Georgia',
        'zipcode': 30316,
        'latitude': 33.741,
        'longitude': -84.346,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
    },
    {
        'name': 'The Mega Complex',
        'street': '219 Evans Street',
        'city': 'San Diego',
        'state': 'California',
        'zipcode': 92102,
        'latitude': 32.708,
        'longitude': -117.135,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
    }
]


const initUsers = async () => {
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

    const user_objects = users.map(user => new User({ _id: user._id, username: user.username, passwordHash: user.passwordHash }))
    const promise_array = user_objects.map(user => user.save())
    await Promise.all(promise_array)


    mongoose.disconnect()

}


const initRegions = async () => {
    if (config.MONGODB_URI) {
        await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
            .then(() => {
                logger.info('connected to MongoDB')
            })
            .catch((error) => {
                logger.error('error connection to MongoDB:', error.message)
            })
    }

    await Region.deleteMany({})

    const region_objects = regions.map(region => new Region({ ...region }))
    const promise_array = region_objects.map(region => region.save())
    await Promise.all(promise_array)

    mongoose.disconnect()
}


const initLandfills = async () => {

    try {


        if (config.MONGODB_URI) {
            await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
                .then(() => {
                    logger.info('connected to MongoDB')
                })
                .catch((error) => {
                    logger.error('error connection to MongoDB:', error.message)
                })
        }

        console.log('started deleting landfills')
        await Landfill.deleteMany({})
        console.log('finished deleting landfills')
        const landfill_objects = landfills.map(landfill => new Landfill({ ...landfill }))
        const promise_array = landfill_objects.map(landfill => landfill.save())
        await Promise.all(promise_array)

        mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
}



initUsers()
initRegions()
initLandfills()
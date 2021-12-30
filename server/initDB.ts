/* eslint-disable @typescript-eslint/no-floating-promises */
import mongoose from 'mongoose'
import config from './utils/config'
import logger from './utils/logger'
import User from './models/user'
import Region from './models/region'
import Landfill from './models/landfill'
import Driver from './models/driver'
import Depot from './models/depot'
import { NewLandfill, NewDriver, NewDepot } from './types'



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

        'name': 'Default   ',
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
        'name': 'Doraville Transfer Station',
        'street': '2784 Woodwin Rd,',
        'city': 'Atlanta',
        'state': 'Georgia',
        'zipcode': 30360,
        'latitude': 33.918,
        'longitude': -84.275,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
    },
    {
        'name': 'Cobb County Landfill',
        'street': '1775 County Services Pkwy SW',
        'city': 'Marietta',
        'state': 'Georgia',
        'zipcode': 30008,
        'latitude': 33.907,
        'longitude': -84.581,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
    },
    {
        'name': 'Republic Services of Atlanta',
        'street': '3045 Donald Lee Hollowell Parkway Northwest',
        'city': 'Woodstock',
        'state': 'Georgia',
        'zipcode': 30318,
        'latitude': 33.784,
        'longitude': -84.487,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
    },
    {
        'name': 'Waste Management - Atlanta West Hauling',
        'street': '3001 S Pioneer Dr SE',
        'city': 'Smyrna',
        'state': 'Georgia',
        'zipcode': 30082,
        'latitude': 33.823,
        'longitude': -84.496,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
    },

]

const drivers: NewDriver[] = [
    {
        'name': 'Forest Schwartz',
        'phone_number': '404-617-9402',
        'email': 'forestschwrtz@gmail.com',
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',

    },
    {
        'name': 'Ralph McGrew',
        'phone_number': '404-861-4598',
        'email': 'rgMcgrew@gmail.com',
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30'
    },
    {
        'name': 'Sarah Mclellon',
        'phone_number': '404-684-7598',
        'email': 'sarah.mclellon@gmail.com',
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30'
    }
]


const depots: NewDepot[] = [
    {
        'name': 'Depot 1',
        'street': '2021, Dahlonega Highway',
        'city': 'Cumming',
        'state': 'Georgia',
        'zipcode': 30040,
        'latitude': 34.25,
        'longitude': -84.111,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30'
    },
    {
        'name': 'Depot 2',
        'street': '1280 Peachtree St NE',
        'city': 'Atlanta',
        'state': 'Georgia',
        'zipcode': 30309,
        'latitude': 33.79,
        'longitude': -84.389,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30'
    }
]


const connectMongoose = async () => {
    if (config.MONGODB_URI) {
        await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
            .then(() => {
                logger.info('connected to MongoDB')
            })
            .catch((error) => {
                logger.error('error connection to MongoDB:', error.message)
            })
    }
}


const initUsers = async () => {
    await User.deleteMany({})
    const user_objects = users.map(user => new User({ _id: user._id, username: user.username, passwordHash: user.passwordHash }))
    const promise_array = user_objects.map(user => user.save())
    await Promise.all(promise_array)
}


const initRegions = async () => {
    await Region.deleteMany({})
    const region_objects = regions.map(region => new Region({ ...region }))
    const promise_array = region_objects.map(region => region.save())
    await Promise.all(promise_array)
}


const initLandfills = async () => {
    await Landfill.deleteMany({})
    const landfill_objects = landfills.map(landfill => new Landfill({ ...landfill }))
    const promise_array = landfill_objects.map(landfill => landfill.save())
    await Promise.all(promise_array)
}


const initDrivers = async () => {
    await Driver.deleteMany({})
    const driver_objects = drivers.map(driver => new Driver({ ...driver }))
    const promise_array = driver_objects.map(driver => driver.save())
    await Promise.all(promise_array)
}


const initDepots = async () => {
    await Depot.deleteMany({})
    const depot_objects = depots.map(depot => new Depot({ ...depot }))
    const promise_array = depot_objects.map(depot => depot.save())
    await Promise.all(promise_array)
}


const runInit = async () => {
    await connectMongoose()
    await initUsers()
    await initRegions()
    await initLandfills()
    await initDrivers()
    await initDepots()
    mongoose.disconnect()
    console.log('finished writing data to database')
}


runInit()


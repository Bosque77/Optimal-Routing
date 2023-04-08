/* eslint-disable @typescript-eslint/no-floating-promises */
import bcrypt from 'bcrypt'
const salt_rounds = 10


import mongoose from 'mongoose'
import config from '../utils/config'
import logger from '../utils/logger'
import User from '../models/user-model'
import Region from '../models/region-model'
import Landfill from '../models/landfill-model'
import Driver from '../models/driver-model'
import Depot from '../models/depot-model'
import Vehicle from '../models/vehicle-model'
import Order from '../models/order-model'

// a function that creates the delivery date and pickup date for the order
// the delivery date is today and the pickup date is tomorrow

interface DateObject {
    delivery_date: string;
    pickup_date: string;
  }
  

  const createDates = (): DateObject => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    const delivery_date = today.toDateString();
    const pickup_date = tomorrow.toDateString();
  
    return { delivery_date, pickup_date };
  };

const { delivery_date, pickup_date } = createDates()

console.log(delivery_date, pickup_date)




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

const landfills = [
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
        'type':'Landfill'
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
        'type':'Landfill'
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
        'type':'Landfill'
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
        'type':'Landfill'
    },

]

const drivers = [
    {
        'name': 'Forest Schwartz',
        'phone_number': '404-617-9402',
        'email': 'forestschwrtz@gmail.com',
        'password': 'password123',
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',

    },
    {
        'name': 'Ralph McGrew',
        'phone_number': '404-861-4598',
        'email': 'rgMcgrew@gmail.com',
        'password': 'password123',
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30'
    },
    {
        'name': 'Sarah Mclellon',
        'phone_number': '404-684-7598',
        'email': 'sarah.mclellon@gmail.com',
        'password': 'password123',
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30'
    }
]


const depots = [
    {
        '_id': '61cdeb3f291ff09681e49c09',
        'name': 'Depot 1',
        'street': '2021, Dahlonega Highway',
        'city': 'Cumming',
        'state': 'Georgia',
        'zipcode': 30040,
        'latitude': 34.25,
        'longitude': -84.111,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
        'type':'Depot'
    },
    {
        '_id': '61cdeb3f291ff09681e49c08',
        'name': 'Depot 2',
        'street': '1280 Peachtree St NE',
        'city': 'Atlanta',
        'state': 'Georgia',
        'zipcode': 30309,
        'latitude': 33.79,
        'longitude': -84.389,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
        'type':'Depot'
    }
]


const vehicles = [
    {
        'start_depot': '61cdeb3f291ff09681e49c09',
        'end_depot': '61cdeb3f291ff09681e49c09',
        'license_number': 'AJXIV',
        'size': 50,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30'
    },
    {
        'start_depot': '61cdeb3f291ff09681e49c09',
        'end_depot': '61cdeb3f291ff09681e49c09',
        'license_number': 'TTXDVG',
        'size': 50,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30'
    },
    {
        'start_depot': '61cdeb3f291ff09681e49c09',
        'end_depot': '61cdeb3f291ff09681e49c09',
        'license_number': 'XXDTGE',
        'size': 50,
        'active': true,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30'
    }
]

const orders = [
    {
        'name': 'Forest Schwartz',
        'email': 'forestschwrtz@gmail.com',
        'phone_number': '404-617-9402',
        'street': '4703 Cambridge Dr.',
        'city': 'Atlanta',
        'state': 'Georgia',
        'zipcode': 30338,
        'latitude': 33.935,
        'longitude': -84.318,
        'dumpster_size': 15,
        'delivery_date': delivery_date,
        'pickup_date': pickup_date,
        'delivery_time': {
            'hour': 12,
            'minute': 35,
            'am_pm': 'AM'
        },
        'pickup_time': {
            'hour': 5,
            'minute': 45,
            'am_pm': 'PM'
        },
        'special_instructions':'Please come early',
        'delivery_completed': false,
        'pickup_completed': false,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
        'type':'Order',
        'active': true
    },
    {
        'name': 'Josh Rodriguez',
        'email': 'jr@gmail.com',
        'phone_number': '404-585-8945',
        'street': '225 Baker St NW',
        'city': 'Atlanta',
        'state': 'Georgia',
        'zipcode': 30313,
        'latitude': 33.764,
        'longitude': -84.395,
        'dumpster_size': 15,
        'delivery_date': 'Wed Dec 29 2021',
        'pickup_date': 'Thu Dec 30 2021',
        'delivery_time': {
            'hour': 12,
            'minute': 35,
            'am_pm': 'AM'
        },
        'pickup_time': {
            'hour': 5,
            'minute': 45,
            'am_pm': 'PM'
        },
        'special_instructions':'Please come early',
        'delivery_completed': true,
        'pickup_completed': false,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
        'type':'Order',
        'active': true
    },
    {
        'name': 'Daniel Carusi',
        'email': 'd.carusi@gmail.com',
        'phone_number': '485-859-8569',
        'street': '690 Olde Rope Mill Park Rd',
        'city': 'Woodstock',
        'state': 'Georgia',
        'zipcode': 30188,
        'latitude': 34.131,
        'longitude': -84.523,
        'dumpster_size': 30,
        'delivery_date': 'Thu Dec 30 2021',
        'pickup_date': 'Wed Jan 05 2022',
        'delivery_time': {
            'hour': 12,
            'minute': 35,
            'am_pm': 'AM'
        },
        'pickup_time': {
            'hour': 5,
            'minute': 45,
            'am_pm': 'PM'
        },
        'special_instructions':'Please come early',
        'delivery_completed': false,
        'pickup_completed': false,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
        'type': 'Order',
        'active': true
    },

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
    const drivers_w_passwordHash = await Promise.all(drivers.map( async (driver) => {
        const password_hash = await bcrypt.hash(driver.password, salt_rounds) 
        const updated_driver = {name:driver.name, phone_number: driver.phone_number, email: driver.email, active: driver.active, user_id: driver.user_id, region_id: driver.region_id, password_hash}
        return (updated_driver)
    }))
    const driver_objects = drivers_w_passwordHash.map(driver => new Driver({ ...driver }))
    const promise_array = driver_objects.map(driver => driver.save())
    await Promise.all(promise_array)
}


const initDepots = async () => {
    await Depot.deleteMany({})
    const depot_objects = depots.map(depot => new Depot({ ...depot }))
    const promise_array = depot_objects.map(depot => depot.save())
    await Promise.all(promise_array)
}

const initVehicles = async () => {
    await Vehicle.deleteMany({})
    const vehicle_objects = vehicles.map(vehicle => new Vehicle({ ...vehicle}))
    const promise_array = vehicle_objects.map(vehicle => vehicle.save())
    await Promise.all(promise_array)
}

const initOrders = async () => {
    await Order.deleteMany({})
    const order_objects = orders.map(order => new Order({ ...order}))
    const promise_array = order_objects.map(order => order.save())
    await Promise.all(promise_array)
}


const runInit = async () => {
    await connectMongoose()
    await initUsers()
    await initRegions()
    await initLandfills()
    await initDrivers()
    await initDepots()
    await initVehicles()
    await initOrders()
    mongoose.disconnect()
    console.log('finished writing data to database')
}


runInit()


/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone_number: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number,
    latitude: Number,
    longitude: Number,
    dumpster_size: Number,
    delivery_date: String,
    pickup_date: String,
    delivery_time: {
        hour: Number,
        minute: Number,
        am_pm: String,
    },
    pickup_time: {
        hour: Number,
        minute: Number,
        am_pm: String,
    },
    special_instructions: String,
    delivery_completed: Boolean,
    pickup_completed: Boolean,
    active: Boolean,
    user_id: String,
    region_id: String,
    type:String
})

orderSchema.set('toJSON', {
    transform: (_document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Order = mongoose.model('Order', orderSchema)

export default Order
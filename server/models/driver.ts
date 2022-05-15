/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose'

const driverSchema = new mongoose.Schema({
    name: String,
    phone_number: String,
    email: {
        type: String,
        unique: true
    },
    password_hash: String,
    active: Boolean,
    user_id: String,
    region_id: String,
})

driverSchema.set('toJSON', {
    transform: (_document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Driver = mongoose.model('Driver', driverSchema)

export default Driver
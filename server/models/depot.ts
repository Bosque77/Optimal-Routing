/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose'

const depotSchema = new mongoose.Schema({
    name: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number,
    latitude: Number,
    longitude: Number,
    active: Boolean,
    user_id: String,
    region_id: String,
    type:String
})

depotSchema.set('toJSON', {
    transform: (_document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Depot = mongoose.model('Depot', depotSchema)

export default Depot
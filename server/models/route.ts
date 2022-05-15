/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose'

const routeSchema = new mongoose.Schema({
    route_types: [String],
    route_items: [String],
    distances: [Number],
    durations: [Number],
    total_distance: Number,
    total_duration: Number,
    driver_id: String,
    user_id: String,
    region_id: String,
    date: String
})

routeSchema.set('toJSON', {
    transform: (_document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Route = mongoose.model('Route', routeSchema)

export default Route
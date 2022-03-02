/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose'

const routeSchema = new mongoose.Schema({
    orders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    depots: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Depot'
    },
    landfills: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Landfill'
    },
    route_items: [String],
    user_id: String,
    region_id: String,
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
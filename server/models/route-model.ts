import mongoose, { ObjectId } from 'mongoose'


interface IRoute {
    route_types: [string],
    route_items: [string],
    distances: [number],
    durations: [number],
    total_distance: number,
    total_duration: number,
    driver_id?: string,
    user_id: string,
    region_id: string,
    date: string
}

interface ReturnedObject {
    id?: string,
    _id?: ObjectId,
    __v?: string
}


const routeSchema = new mongoose.Schema<IRoute>({
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
    transform: (_document, returnedObject: ReturnedObject) => {
        returnedObject.id = returnedObject._id?.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Route = mongoose.model<IRoute>('Route', routeSchema)

export default Route
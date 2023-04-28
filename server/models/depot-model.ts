import mongoose, { ObjectId } from 'mongoose'
import {Depot} from '../../shared/types'


interface ReturnedObject {
    id?: string,
    _id?: ObjectId,
    __v?: string
}


const depotSchema = new mongoose.Schema<Depot>({
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
    transform: (_document, returnedObject: ReturnedObject) => {
        returnedObject.id = returnedObject._id?.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Depot = mongoose.model<Depot>('Depot', depotSchema)

export default Depot
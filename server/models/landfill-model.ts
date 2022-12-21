import mongoose, { ObjectId } from 'mongoose'


interface ILandfill {
    name: string,
    street: string,
    city: string,
    state: string,
    zipcode: number,
    latitude: number,
    longitude: number,
    active: boolean,
    user_id: string,
    region_id: string, 
    type: string
}


interface ReturnedObject {
    id?: string,
    _id?: ObjectId,
    __v?: string
}


const landfillSchema = new mongoose.Schema<ILandfill>({
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

landfillSchema.set('toJSON', {
    transform: (_document, returnedObject: ReturnedObject) => {
        returnedObject.id = returnedObject._id?.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Landfill = mongoose.model<ILandfill>('Landfill', landfillSchema)

export default Landfill
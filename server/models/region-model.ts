import mongoose, { ObjectId } from 'mongoose'

interface IRegion {
    name: string,
    latitude: number,
    longitude: number,
    user_id: string
}

interface ReturnedObject {
    id?: string,
    _id?: ObjectId,
    __v?: string
}


const regionSchema = new mongoose.Schema<IRegion>({
    name: String,
    latitude: Number,
    longitude: Number,
    user_id: String,
})

regionSchema.set('toJSON', {
    transform: (_document, returnedObject: ReturnedObject) => {
        returnedObject.id = returnedObject._id?.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Region = mongoose.model<IRegion>('Region', regionSchema)

export default Region
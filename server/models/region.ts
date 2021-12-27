/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose'

const regionSchema = new mongoose.Schema({
    name: String,
    user_id: String,
})

regionSchema.set('toJSON', {
    transform: (_document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Region = mongoose.model('Region', regionSchema)

export default Region
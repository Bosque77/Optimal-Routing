/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose'


interface IDriver {
    name: string, 
    phone_number: string,
    email: string,
    password_hash: string,
    active: boolean,
    user_id: string,
    region_id: string
}

const driverSchema = new mongoose.Schema<IDriver>({
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

const Driver = mongoose.model<IDriver>('Driver', driverSchema)

export default Driver
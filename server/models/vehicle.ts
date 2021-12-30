/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose'

const vehicleSchema = new mongoose.Schema({
    license_number: String,
    size: Number,
    start_depot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Depot'
    },
    stop_depot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Depot'
    },
    active: Boolean,
    user_id: String,
    region_id: String,
})

vehicleSchema.set('toJSON', {
    transform: (_document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

export default Vehicle
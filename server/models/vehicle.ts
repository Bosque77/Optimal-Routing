import mongoose, { ObjectId } from 'mongoose'

interface IVehicle {
    license_number: string,
    size: number,
    start_depot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Depot'
    },
    end_depot?: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Depot'
    },
    active: boolean,
    user_id: string,
    region_id: string
}

interface ReturnedObject {
    id?: string,
    _id?: ObjectId,
    __v?: string,
    passwordHash?: string
}

const vehicleSchema = new mongoose.Schema<IVehicle>({
    license_number: String,
    size: Number,
    start_depot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Depot'
    },
    end_depot: {
        type: mongoose.Schema.Types.ObjectId || undefined,
        ref: 'Depot'
    },
    active: Boolean,
    user_id: String,
    region_id: String,
})

vehicleSchema.set('toJSON', {
    transform: (_document, returnedObject: ReturnedObject) => {
        returnedObject.id = returnedObject._id?.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Vehicle = mongoose.model<IVehicle>('Vehicle', vehicleSchema)

export default Vehicle
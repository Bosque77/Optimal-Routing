import mongoose, { ObjectId } from 'mongoose'


export interface IOrder {
    name: string,
    email: string,
    phone_number: string,
    street: string,
    city: string,
    state: string,
    zipcode: number,
    latitude: number,
    longitude: number,
    dumpster_size: number,
    delivery_date: string,
    pickup_date: string,
    delivery_time?: {
        hour: number,
        minute: number,
        am_pm: string,
    },
    pickup_time?: {
        hour: number,
        minute: number,
        am_pm: string,
    },
    special_instructions?: string,
    delivery_completed: boolean,
    pickup_completed: boolean,
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


const orderSchema = new mongoose.Schema<IOrder>({
    name: {type: String, required : true},
    email: {type:String, required: true},
    phone_number: {type: String, required: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    state: { type: String, required: true},
    zipcode: {type: Number, required: true},
    latitude: {type: Number, required: true},
    longitude: { type: Number, required: true},
    dumpster_size: {type: Number, required: true},
    delivery_date: { type: String, required: true},
    pickup_date: { type: String, required: true},
    delivery_time: {
        hour: Number,
        minute: Number,
        am_pm: String,
    },
    pickup_time: {
        hour: Number,
        minute: Number,
        am_pm: String,
    },
    special_instructions: String,
    delivery_completed: {type: Boolean, required: true},
    pickup_completed: { type: Boolean, required: true},
    active: {type: Boolean, required: true},
    user_id: {type: String, required: true},
    region_id: {type: String, required: true},
    type: {type: String, required: true}
})

orderSchema.set('toJSON', {
    transform: (_document, returnedObject: ReturnedObject) => {
        returnedObject.id = returnedObject._id?.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Order = mongoose.model<IOrder>('Order', orderSchema)

export default Order
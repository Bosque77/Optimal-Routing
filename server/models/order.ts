import mongoose, { ObjectId } from 'mongoose'


interface IOrder {
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
    delivery_time: {
        hour: number,
        minute: number,
        am_pm: string,
    },
    pickup_time: {
        hour: number,
        minute: number,
        am_pm: string,
    },
    special_instructions: string,
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
    name: String,
    email: String,
    phone_number: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number,
    latitude: Number,
    longitude: Number,
    dumpster_size: Number,
    delivery_date: String,
    pickup_date: String,
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
    delivery_completed: Boolean,
    pickup_completed: Boolean,
    active: Boolean,
    user_id: String,
    region_id: String,
    type:String
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
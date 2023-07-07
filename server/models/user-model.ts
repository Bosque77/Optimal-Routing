import mongoose, { ObjectId } from 'mongoose'
import {User} from '../types'



interface ReturnedObject {
    id?: string,
    _id?: ObjectId,
    __v?: string,
    passwordHash?: string
}

const userSchema = new mongoose.Schema<User>({
    email: {
        type: String,
        unique: true,
    },
    first_name: String,
    last_name: String,
    verified: Boolean,
    passwordHash: String,
    verificationCode: String,
    stripeUserId: String,
    phone: String,
})



userSchema.set('toJSON', {
    transform: (_document, returnedObject: ReturnedObject) => {
        returnedObject.id = returnedObject._id?.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model<User>('User', userSchema)

export default User


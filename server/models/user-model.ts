import mongoose, { ObjectId } from 'mongoose'
import {User} from '../../shared/types'



interface ReturnedObject {
    id?: string,
    _id?: ObjectId,
    __v?: string,
    passwordHash?: string
}

const userSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        unique: true,
    },
    passwordHash: String,
    stripeUserId: String,
    email: String,
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


import mongoose, { ObjectId } from 'mongoose'
// import uniqueValidator from 'mongoose-unique-validator'


interface IUser{
    username: {
        type: string,
        unique: true
    },
    passwordHash: string
}

interface ReturnedObject {
    id?: string,
    _id?: ObjectId,
    __v?: string,
    passwordHash?: string
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        unique: true,
    },
    passwordHash: String,
})

// FOREST UNCOMMENT THIS CODE IF THE UNIQUE VALIDATOR NO LONGER WORKS
// userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (_document, returnedObject: ReturnedObject) => {
        returnedObject.id = returnedObject._id?.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model<IUser>('User', userSchema)

export default User


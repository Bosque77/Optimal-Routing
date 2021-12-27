/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    passwordHash: String,
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (_document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

export default User


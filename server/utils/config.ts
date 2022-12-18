import * as dotenv from 'dotenv' 
dotenv.config()


const PORT = process.env.PORT
const SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI
const SALT_ROUNDS = process.env.SALT_ROUNDS

export default {
    MONGODB_URI,
    PORT,
    SECRET,
    SALT_ROUNDS
}

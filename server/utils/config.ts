import * as dotenv from 'dotenv' 
dotenv.config()

const ENV = process.env.NODE_ENV || 'development'; 

const PORT = process.env.PORT
const SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI
const SALT_ROUNDS = process.env.SALT_ROUNDS

let SERVER_URI;
if(ENV === 'production'){
    SERVER_URI = process.env.PROD_URI
} else {
    SERVER_URI = process.env.TEST_URI
}

export default {
    MONGODB_URI,
    PORT,
    SECRET,
    SALT_ROUNDS,
    SERVER_URI
}

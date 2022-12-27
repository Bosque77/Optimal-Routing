const bcrypt = require('bcrypt')



const passw_1 = 'password123'
const passw_2 = 'password1234'

const saltRounds = 10




const createPasswordHash = async() => {
    const passwordHash_1 = await bcrypt.hash(passw_1, saltRounds)
    const passwordHash_2 = await bcrypt.hash(passw_2, saltRounds)
    console.log(`passwordHash 1: ${passwordHash_1}`)
    console.log(`passwordHash 2: ${passwordHash_2}`)
}

createPasswordHash()
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import Driver from '../models/driver'
import config from '../utils/config'

const driverLoginRouter = express.Router()



// eslint-disable-next-line @typescript-eslint/no-misused-promises
driverLoginRouter.post('/', async (req, res) => {
    console.log('inside user post')
    const body = req.body

    console.log('looking for driver')
    const driver = await Driver.findOne({ email: body.email })
    console.log(driver)
    const passwordCorrect = driver === null
        ? false
        : await bcrypt.compare(body.password, driver.password_hash)

    console.log(passwordCorrect)


        
    if (!(driver && passwordCorrect)) {
        res.status(401).json({
            error: 'invalid username or password'
        })
    } else {

        const userForToken = {
            email: driver?.email,
            id: driver?.id
        }
        if (config.SECRET) {
            const token = jwt.sign(userForToken, config.SECRET)
            res
                .status(200)
                .send({ token, email: driver.email })
        }
    }



})



export default driverLoginRouter
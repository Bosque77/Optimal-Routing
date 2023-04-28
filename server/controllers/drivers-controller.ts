import express from 'express'
import driverService from '../services/driver-service'
import Driver from '../models/driver-model'
import config from '../utils/config'
import bcrypt from 'bcrypt'


const driverRouter = express.Router()

driverRouter.get('/', async(req:any, res) => {
    console.log('inside the driver router')
    try {
        const user = req.user
        const user_id = user._id as string
        const region_id = req.query.region_id as string     
        const drivers = (await driverService.getEntriesByRegionAndUser(user_id, region_id))
        res.status(200).send(drivers)
    }catch (error){
        res.status(500).send('Error getting the driver entries by user and region')
    }
})

driverRouter.put('/:id', async(req:any, res) => {
    try{
        const updated_driver = req.body
        const driver_id = req.params.id
        const driver = await Driver.findByIdAndUpdate(driver_id, {...updated_driver})
        res.status(200).send(driver)
    }catch(error){
        res.status(500).send('Error saving the driver')
    }
})

driverRouter.delete('/:id', async(req:any, res) => {
    try{
        const driver_id = req.params.id
        await Driver.findByIdAndDelete(driver_id)
        res.status(200).send('driver deleted successfully')
    }catch(error){
        console.log('error occured')
        res.status(500).send('Error deleting the driver')
    }
})


driverRouter.post('/', async (req:any, res)=> {
    try {
        console.log('inside the driver post request')
        const user = req.user
        const user_id = user._id as string
        const new_driver = req.body


        const password = new_driver.password

        const salt_rounds = parseInt(config.SALT_ROUNDS as string) 
        const password_hash = await bcrypt.hash(password, salt_rounds)

        delete new_driver.password
        const driver_object = new Driver({...new_driver,password_hash,'user_id': user_id})


        const returned_data = (await driver_object.save())
        res.status(200).send(returned_data)
    }catch (error){
        res.status(500).send('Error getting the driver entries by user and region')
    }
})


export default driverRouter
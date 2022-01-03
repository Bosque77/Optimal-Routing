/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import driverService from '../services/driverService'
import Driver from '../models/driver'

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
        const user = req.user
        const user_id = user._id as string
        const new_driver = req.body
        const driver_object = new Driver({...new_driver,'user_id': user_id})
        const returned_data = (await driver_object.save())
        res.status(200).send(returned_data)
    }catch (error){
        res.status(500).send('Error getting the driver entries by user and region')
    }
})


export default driverRouter
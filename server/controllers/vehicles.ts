/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import Vehicle from '../models/vehicle'
import * as mongoDB from 'mongodb'


const vehicleRouter = express.Router()

vehicleRouter.get('/', async(req:any, res) => {
    console.log('inside the vehicle router')
    try {
        const user = req.user
        const user_id = user._id as string
        const region_id = req.query.region_id as string     
        const vehicles = await Vehicle.find({user_id: user_id, region_id:region_id}).populate('start_depot').populate('end_depot') as unknown as mongoDB.Collection
        res.status(200).send(vehicles)
    }catch (error){
        res.status(500).send('Error getting the vehicle entries by user and region')
    }
})

vehicleRouter.put('/:id', async(req:any, res) => {
    try{
        const updated_vehicle = req.body
        if(!updated_vehicle['end_depot']){
            updated_vehicle['end_depot'] = null
        }
        const vehicle_id = req.params.id
        await Vehicle.findByIdAndUpdate(vehicle_id, {...updated_vehicle})
        const  populated_vehicle = await Vehicle.findById(vehicle_id).populate('start_depot').populate('end_depot')
        console.log('inside vehicle put')
        console.log(populated_vehicle)
        res.status(200).send(populated_vehicle)

    }catch(error){
        res.status(500).send('Error saving the vehicle')
    }
})

vehicleRouter.delete('/:id', async(req:any, res) => {
    try{
        const vehicle_id = req.params.id
        await Vehicle.findByIdAndDelete(vehicle_id)
        res.status(200).send('vehicle deleted successfully')
    }catch(error){
        console.log('error occured')
        res.status(500).send('Error deleting the vehicle')
    }
})


vehicleRouter.post('/', async (req:any, res)=> {
    try {
        const user = req.user
        const user_id = user._id as string
        const new_vehicle = req.body
        const vehicle_object = new Vehicle({...new_vehicle,'user_id': user_id})
        const returned_data = (await vehicle_object.save())
        res.status(200).send(returned_data)
    }catch (error){
        res.status(500).send('Error getting the vehicle entries by user and region')
    }
})


export default vehicleRouter
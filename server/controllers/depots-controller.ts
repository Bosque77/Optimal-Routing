/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import Depot from '../models/depot-model'
import * as mongoDB from 'mongodb'


const depotRouter = express.Router()

depotRouter.get('/', async(req:any, res) => {
    console.log('inside the depot router')
    try {
        const user = req.user
        const user_id = user._id as string
        const region_id = req.query.region_id as string     
        const depots = await Depot.find({user_id: user_id, region_id:region_id}).populate('depots') as unknown as mongoDB.Collection
        res.status(200).send(depots)
    }catch (error){
        res.status(500).send('Error getting the depot entries by user and region')
    }
})

depotRouter.put('/:id', async(req:any, res) => {
    try{
        const updated_depot = req.body
        const depot_id = req.params.id
        const depot = await Depot.findByIdAndUpdate(depot_id, {...updated_depot})
        res.status(200).send(depot)
    }catch(error){
        res.status(500).send('Error saving the depot')
    }
})

depotRouter.delete('/:id', async(req:any, res) => {
    try{
        const depot_id = req.params.id
        await Depot.findByIdAndDelete(depot_id)
        res.status(200).send('depot deleted successfully')
    }catch(error){
        console.log('error occured')
        res.status(500).send('Error deleting the depot')
    }
})


depotRouter.post('/', async (req:any, res)=> {
    try {
        const user = req.user
        const user_id = user._id as string
        const new_depot = req.body
        const depot_object = new Depot({...new_depot,'user_id': user_id})
        const returned_data = (await depot_object.save())
        res.status(200).send(returned_data)
    }catch (error){
        res.status(500).send('Error getting the depot entries by user and region')
    }
})


export default depotRouter
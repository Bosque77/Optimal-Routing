/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import Landfill from '../models/landfill'
import landfillService from '../services/landfillService'


const landfillRouter = express.Router()

landfillRouter.get('/:region_id', async(req:any, res) => {
    console.log('inside the landfill router')
    try {
        const user = req.user
        const user_id = user._id as string
        const region_id = req.params.region_id as string
        
        const landfills = (await landfillService.getEntriesByRegionAndUser(user_id, region_id))
        res.status(200).send(landfills)
    }catch (error){
        res.status(500).send('Error getting the landfill entries by user and region')
    }
})

landfillRouter.put('/:id', async(req:any, res) => {
    console.log('inside landfill put request')
    try{
        
        
        const updated_landfill = req.body
        console.log('the updated landfill i am about to put in')
        console.log(updated_landfill)
        const landfill_id = req.params.id
        const landfill = await Landfill.findByIdAndUpdate(landfill_id, {...updated_landfill})
        console.log(landfill)
        res.status(200).send(landfill)
    }catch(error){
        console.log('error occured')
        res.status(500).send('Error saving the landfill')
    }
})

landfillRouter.delete('/:id', async(req:any, res) => {
    console.log('inside landfill delete request')
    try{
        const landfill_id = req.params.id
        await Landfill.findByIdAndDelete(landfill_id)
        res.status(200).send('landfill deleted successfully')
    }catch(error){
        console.log('error occured')
        res.status(500).send('Error deleting the landfill')
    }
})




landfillRouter.post('/', async (req:any, res)=> {
    try {
        const user = req.user
        const user_id = user._id as string
        const new_landfill = req.body
        const landfill_object = new Landfill({...new_landfill,'user_id': user_id})
        
        
        const returned_data = (await landfill_object.save())
        res.status(200).send(returned_data)
    }catch (error){
        res.status(500).send('Error getting the landfill entries by user and region')
    }
})


export default landfillRouter
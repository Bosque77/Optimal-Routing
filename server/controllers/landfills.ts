/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import Landfill from '../models/landfill'
import landfillService from '../services/landfillService'


const landfillRouter = express.Router()

landfillRouter.get('/region/:id', async(req:any, res) => {
    console.log('inside the landfill router')
    try {
      
        const user = req.user
        const user_id = user._id as string
        const region_id = req.params.id as string
        
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


export default landfillRouter
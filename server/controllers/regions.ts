/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import Region from '../models/region'
import regionService from '../services/regionService'


const regionRouter = express.Router()

regionRouter.get('/', async(req:any, res) => {
    try {
        const user = req.user
        const user_id = user._id as string
        
        const regions = (await regionService.getEntries(user_id))
        res.status(200).send(regions)
    }catch (error){
        res.status(500).send('Error getting the region entries')
    }

})


regionRouter.post('/', async(req:any, res) => {
    try {
        const user = req.user
        const user_id = user._id as string
        const new_region = req.body 
        const new_region_object = new Region({...new_region,user_id:user_id})
        const response = await new_region_object.save()
        console.log(response)
        res.status(200).send(response)
    }catch (error){
        res.status(500).send('Error adding this region entry')
    }

})

export default regionRouter
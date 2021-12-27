/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
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


export default regionRouter
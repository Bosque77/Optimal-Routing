/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import regionService from '../services/regionService'


const regionRouter = express.Router()

regionRouter.get('/:id', async (req, res) => {
    try {
        const user_id = req.params.id
        console.log(user_id)
        const regions = (await regionService.getEntries(user_id))
        res.status(200).send(regions)
    }catch (error){
        res.status(500).send('Error getting the region entries')
    }

})


regionRouter.get('/', (_req,res) => {
    res.status(200).send('made it through')
})

export default regionRouter
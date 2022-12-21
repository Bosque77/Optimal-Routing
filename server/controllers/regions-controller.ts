import express from 'express'
import regionService from '../services/region-service'
import asyncHandler from 'express-async-handler'
import * as z from 'zod'


const regionSchema = z.object({
        name: z.string()
})


const regionRouter = express.Router()



// create new region
regionRouter.post('/', asyncHandler(async(req:any, res) => {
        const user = req.user
        const user_id = user._id as string
        const new_region = regionSchema.parse(req.body) 
        const response = await regionService.createRegion(new_region, user_id)
        res.status(200).send(response)
}))

// get all the regions
regionRouter.get('/', asyncHandler(async(req:any, res) => {
        const user = req.user
        const user_id = user._id as string
        const regions = (await regionService.getRegions(user_id))
        res.status(200).send(regions)
}))



// delete region
regionRouter.delete('/:id', asyncHandler(async(req:any, res) => {
        const region_id = req.params.id
        const deleted_region = await regionService.deleteRegion(region_id)
        if(deleted_region){
            res.status(204)
        }else{
            res.status(404).send({error: 'region not found'})
        }
}))

export default regionRouter
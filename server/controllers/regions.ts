/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express'
import Region from '../models/user'

const regionRouter = express.Router()

regionRouter.get('/:id', async (request: any, response: any) => {
    const regions = await Region.findById(request.params.id)
    if (regions) {
        response.json(regions.toJSON())
    } else {
        response.status(404).end()
    }
})


export default regionRouter
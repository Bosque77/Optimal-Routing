/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import Route from '../models/route'
import routeService from '../services/routeService'


const routeRouter = express.Router()



routeRouter.get('/date/:region_id/:date', async(req:any, res) => {
    console.log('inside the order router')
    try {
      
        const user = req.user
        const user_id = user._id as string
        const region_id = req.params.region_id as string
        const date = req.params.date as string
        
        const routes = (await routeService.getEntriesByRegionAndDate(user_id, region_id, date))
        res.status(200).send(routes)
    }catch (error){
        res.status(500).send('Error getting the order entries by user and region')
    }
})

routeRouter.put('/:id', async(req:any, res) => {
    console.log('inside order put request')
    try{
        const updated_order = req.body
        const order_id = req.params.id
        const order = await Route.findByIdAndUpdate(order_id, {...updated_order})
        res.status(200).send(order)
    }catch(error){
        res.status(500).send('Error saving the order')
    }
})

routeRouter.delete('/:id', async(req:any, res) => {
    console.log('inside order delete request')
    try{
        const order_id = req.params.id
        await Route.findByIdAndDelete(order_id)
        res.status(200).send('order deleted successfully')
    }catch(error){
        res.status(500).send('Error deleting the order')
    }
})




routeRouter.post('/', async (req:any, res)=> {
    try {
        const user = req.user
        const user_id = user._id as string
        const new_route = req.body
        const order_object = new Route({...new_route,'user_id': user_id})
        const returned_data = (await order_object.save())
        res.status(200).send(returned_data)
    }catch (error){
        res.status(500).send('Error getting the order entries by user and region')
    }
})


export default routeRouter
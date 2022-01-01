/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import Order from '../models/order'
import orderService from '../services/orderService'


const orderRouter = express.Router()

// orderRouter.get('/region/:id', async(req:any, res) => {
//     console.log('inside the order router')
//     try {
      
//         const user = req.user
//         const user_id = user._id as string
//         const region_id = req.params.id as string
        
//         const orders = (await orderService.getEntriesByRegionAndUser(user_id, region_id))
//         res.status(200).send(orders)
//     }catch (error){
//         res.status(500).send('Error getting the order entries by user and region')
//     }
// })

orderRouter.get('/date/:region_id/:date', async(req:any, res) => {
    console.log('inside the order router')
    try {
      
        const user = req.user
        const user_id = user._id as string
        const region_id = req.params.region_id as string
        const date = req.params.date as string
        
        const orders = (await orderService.getEntriesByRegionAndDate(user_id, region_id, date))
        res.status(200).send(orders)
    }catch (error){
        res.status(500).send('Error getting the order entries by user and region')
    }
})

orderRouter.put('/:id', async(req:any, res) => {
    console.log('inside order put request')
    try{
        
        
        const updated_order = req.body
        console.log('the updated order i am about to put in')
        console.log(updated_order)
        const order_id = req.params.id
        const order = await Order.findByIdAndUpdate(order_id, {...updated_order})
        console.log(order)
        res.status(200).send(order)
    }catch(error){
        console.log('error occured')
        res.status(500).send('Error saving the order')
    }
})

orderRouter.delete('/:id', async(req:any, res) => {
    console.log('inside order delete request')
    try{
        const order_id = req.params.id
        await Order.findByIdAndDelete(order_id)
        res.status(200).send('order deleted successfully')
    }catch(error){
        console.log('error occured')
        res.status(500).send('Error deleting the order')
    }
})




orderRouter.post('/', async (req:any, res)=> {
    try {
        const user = req.user
        const user_id = user._id as string
        const new_order = req.body
        const order_object = new Order({...new_order,'user_id': user_id})
        
        
        const returned_data = (await order_object.save())
        res.status(200).send(returned_data)
    }catch (error){
        res.status(500).send('Error getting the order entries by user and region')
    }
})


export default orderRouter
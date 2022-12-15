/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express, {Request, Response} from 'express'
import Order from '../models/order'
import orderService from '../services/orderService'


const orderRouter = express.Router()


orderRouter.get('/date', async(req: Request, res: Response) => {
    // Extract the user_id, region_id, and date from the request
    const user = req.user 
    const user_id = user._id as string
    const region_id = req.query.region as string
    const date = req.query.date as string
  
    try {
      // Get the orders for the specified user, region, and date
      const orders = (await orderService.getEntriesByRegionAndDate(user_id, region_id, date))
  
      // Send the orders in the response
      res.status(200).send(orders)
    } catch (error) {
      // Handle any errors that occurred while getting the orders
      res.status(500).send('Error getting the order entries by user and region')
    }
  })

orderRouter.put('/:id', async(req:any, res) => {
    console.log('inside order put request')
    try{
        
        
        const updated_order = req.body
        const order_id = req.params.id
        const order = await Order.findByIdAndUpdate(order_id, {...updated_order})
        res.status(200).send(order)
    }catch(error){
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
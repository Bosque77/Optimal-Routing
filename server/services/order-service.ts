import Order from '../models/order-model'
import * as mongoDB from 'mongodb'

const getEntriesByRegionAndDate = async (user_id: string, region_id: string, date: string) => {
    // looks up orders from mongodb by using the user_id, region_id and date
    // returns an array of orders
    const orders = await Order.find({user_id: user_id, region_id:region_id, $or: [{delivery_date: date},{ pickup_date: date}]}) as unknown as mongoDB.Collection
    return orders
}

const updateOrder = async (order_id: string, updated_order: any)=>  {
    // updates an order in the database
    // returns the updated order
    const order = await Order.findByIdAndUpdate(order_id, { ...updated_order });
    return order
}

const deleteOrder = async (order_id: string) => {
    // deletes an order from the database
    await Order.findByIdAndDelete(order_id);
}

const createOrder = async (new_order: any, user_id: string) => {
    // creates an order in the database
    // returns the created order
    const query = new Order({ ...new_order, user_id: user_id });
    const order_object = await query.save();
    return order_object
}


export default {
    getEntriesByRegionAndDate, updateOrder, deleteOrder, createOrder
}
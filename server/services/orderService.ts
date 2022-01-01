
import Order from '../models/order'
import * as mongoDB from 'mongodb'

const getEntriesByRegionAndDate = async (user_id: string, region_id: string, date: string) => {
    const orders = await Order.find({user_id: user_id, region_id:region_id, $or: [{delivery_date: date},{ pickup_date: date}]}) as unknown as mongoDB.Collection
    return orders
}


export default {
    getEntriesByRegionAndDate
}
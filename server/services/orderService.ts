import Order from '../models/order'
import * as mongoDB from 'mongodb'

const getEntriesByRegionAndDate = async (user_id: string, region_id: string, date: string) => {
    // looks up orders from mongodb by using the user_id, region_id and date
    // returns an array of orders


    const orders = await Order.find({user_id: user_id, region_id:region_id, $or: [{delivery_date: date},{ pickup_date: date}]}) as unknown as mongoDB.Collection
    return orders
}


export default {
    getEntriesByRegionAndDate
}
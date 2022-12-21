
import Route from '../models/route-model'
import * as mongoDB from 'mongodb'

const getEntriesByRegionAndDate = async (user_id: string, region_id: string, date: string) => {
    const routes = await Route.find({user_id: user_id, region_id:region_id, date:date}) as unknown as mongoDB.Collection
    return routes
}


export default {
    getEntriesByRegionAndDate
}
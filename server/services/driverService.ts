
import Driver from '../models/driver'
import * as mongoDB from 'mongodb'

const getEntriesByRegionAndUser = async (user_id: string, region_id: string) => {
    console.log('about to send request to mongo')
    const drivers = await Driver.find({user_id: user_id, region_id:region_id}) as unknown as mongoDB.Collection
    console.log(drivers)
    return drivers
}


export default {
    getEntriesByRegionAndUser
}
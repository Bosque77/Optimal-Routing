
import Region from '../models/region'
import * as mongoDB from 'mongodb'

const getEntries = async (id: string) => {
    const regions = await Region.find({user_id: id}) as unknown as mongoDB.Collection
    return regions
}


export default {
    getEntries
}

import Landfill from '../models/landfill'
import * as mongoDB from 'mongodb'

const getEntriesByRegionAndUser = async (user_id: string, region_id: string) => {
    const landfills = await Landfill.find({user_id: user_id, region_id:region_id}) as unknown as mongoDB.Collection
    console.log(landfills)
    return landfills
}


export default {
    getEntriesByRegionAndUser
}
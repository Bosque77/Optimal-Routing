
import Region from '../models/region-model'
import * as mongoDB from 'mongodb'


// creates a new region for the user
const createRegion = async (new_region: any, user_id: string) => {
    const new_region_object = new Region({...new_region,user_id:user_id})
    const response = await new_region_object.save()
    return response
}

// returns all regions for a user
const getRegions = async (id: string) => {
    const regions = await Region.find({user_id: id}) as unknown as mongoDB.Collection
    return regions
}

// deletes a region by its id
const deleteRegion = async (id: string) => {
    const response = await Region.findByIdAndDelete(id)
    return response
}


export default {
    getRegions, createRegion, deleteRegion
}

import Landfill from '../models/landfill-model'
import * as mongoDB from 'mongodb'


// create new landfill
const createLandfill = async (new_landfill: any, user_id: string) => {
    const landfill_object = new Landfill({...new_landfill, user_id: user_id})
    const returned_data = await landfill_object.save()
    return returned_data
}

// get all of the landfills for the user and region specified
const getEntriesByRegionAndUser = async (user_id: string, region_id: string) => {
    console.log('inside landfill service')
    const landfills = await Landfill.find({user_id: user_id, region_id:region_id}) as unknown as mongoDB.Collection
    console.log(landfills)
    return landfills
}

// updates the landfill by id
const updateLandfill = async (landfill_id: string, updated_landfill: any) => {
    const landfill = await Landfill.findByIdAndUpdate(landfill_id, {
        ...updated_landfill,
      });
    return landfill
}

// deletes the landfill by id
const deleteLandfill = async (landfill_id: string) => {
    const landfill = await Landfill.findByIdAndDelete(landfill_id);
    return landfill
}


export default {
    createLandfill, getEntriesByRegionAndUser, updateLandfill, deleteLandfill
}
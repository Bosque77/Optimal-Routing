import Vehicle from '../models/vehicle-model'
import * as mongoDB from 'mongodb'


// create vehicle
const createVehicle = async (new_vehicle:any, user_id: string) => {
    const vehicle_object = new Vehicle({...new_vehicle,'user_id': user_id})
    const returned_data = (await vehicle_object.save())
    const vehicle_id = returned_data._id
    const  populated_vehicle = await Vehicle.findById(vehicle_id).populate('start_depot').populate('end_depot')
    return populated_vehicle
}


// get vehicles by user and region
const getVehiclesByUserAndRegion = async (user_id:string, region_id:string) => {
    const vehicles = await Vehicle.find({user_id: user_id, region_id:region_id}).populate('start_depot').populate('end_depot') as unknown as mongoDB.Collection
    return vehicles
}


// get vehicle by id
const getVehicleById = async (vehicle_id:string) => {
    const populated_vehicle = await Vehicle.findById(vehicle_id).populate('start_depot').populate('end_depot')
    return populated_vehicle
}

// update vehicle
const updateVehicle = async (vehicle_id:string, updated_vehicle:any) => {
    const vehicle = await Vehicle.findByIdAndUpdate(vehicle_id, {...updated_vehicle})
    return vehicle
}



// delete vehicle by id
const deleteVehicleById = async (vehicle_id:string) => {
    const deleted_vehicle = await Vehicle.findByIdAndDelete(vehicle_id)
    return deleted_vehicle
}


export default {createVehicle, getVehiclesByUserAndRegion, getVehicleById, updateVehicle,  deleteVehicleById}
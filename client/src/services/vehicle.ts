import axios from 'axios'
import { EditVehicle, NewVehicle, Vehicle } from '../../../shared/types'
import { Region } from '../../../shared/types'
import { token } from './config'
const baseUrl = '/vehicles'




const getByRegion = async (region: Region) => {
    const url = baseUrl + `?region_id=${region.id}`
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.get(url, config)
    return response.data
}


const getAll = async () => {
    const config = {
        headers: { Authorization: token },
    }
    console.log(config)
    const response = await axios.get(baseUrl, config)
    return response.data
}

const put = async (vehicle: EditVehicle) => {
    const config = {
        headers: { Authorization: token },
    }
    const id = vehicle.id
    const url = baseUrl + `/${id}`
    const response= await axios.put(url, vehicle, config)
    return response.data
}


const deleteVehicle = async (vehicle: Vehicle) => {
    const config = {
        headers: { Authorization: token },
    }
    const id = vehicle.id
    const url = baseUrl + `/${id}`
    const response = await axios.delete(url, config)
    return response
}

const createNew = async (vehicle: NewVehicle) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, vehicle, config)
    return response.data
}

export default { getAll, put, deleteVehicle, createNew, getByRegion }
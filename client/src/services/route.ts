import axios from 'axios'
import { NewTruckRoute, TruckRoute } from '../types'
import { Region } from '../types'
import { token } from './config'
const baseUrl = '/routes'




const getByRegion = async (region: Region) => {
    const url = baseUrl + `?region_id=${region.id}`
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.get(url, config)
    return response.data
}

// Need a specific server url for /orders/date
const getByRegionAndDate = async (region: Region, date: string) => {
    const url = baseUrl + `/date/${region.id}/${date}`
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.get(url, config)
    console.log(response.data)
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

const put = async (truck_route: TruckRoute) => {
    const config = {
        headers: { Authorization: token },
    }
    const id = truck_route.id
    const url = baseUrl + `/${id}`
    await axios.put(url, truck_route, config)
    return truck_route
}


const deleteOrder = async (truck_route: TruckRoute) => {
    const config = {
        headers: { Authorization: token },
    }
    const id = truck_route.id
    const url = baseUrl + `/${id}`
    const response = await axios.delete(url, config)
    return response
}

const createNew = async (truck_route: NewTruckRoute) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, truck_route, config)
    return response.data
}

export default { getAll, put, deleteOrder, createNew, getByRegion, getByRegionAndDate }
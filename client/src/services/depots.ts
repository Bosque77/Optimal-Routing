import axios from 'axios'
import { Depot, NewDepot } from '../types'
import { Region } from '../types'
import { token } from './config'
const baseUrl = '/depots'




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

const put = async (depot: Depot) => {
    const config = {
        headers: { Authorization: token },
    }
    const id = depot.id
    const url = baseUrl + `/${id}`
    await axios.put(url, depot, config)
    return depot
}


const deleteDepot = async (depot: Depot) => {
    const config = {
        headers: { Authorization: token },
    }
    const id = depot.id
    const url = baseUrl + `/${id}`
    const response = await axios.delete(url, config)
    return response
}

const createNew = async (depot: NewDepot) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, depot, config)
    return response.data
}

export default { getAll, put, deleteDepot, createNew, getByRegion }
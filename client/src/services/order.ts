import axios from 'axios'
import { NewOrder, Order } from '../types'
import { Region } from '../types'
import { token } from './config'
const baseUrl = '/orders'




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

const put = async (order: Order) => {
    const config = {
        headers: { Authorization: token },
    }
    const id = order.id
    const url = baseUrl + `/${id}`
    await axios.put(url, order, config)
    return order
}


const deleteOrder = async (order: Order) => {
    const config = {
        headers: { Authorization: token },
    }
    const id = order.id
    const url = baseUrl + `/${id}`
    const response = await axios.delete(url, config)
    return response
}

const createNew = async (order: NewOrder) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, order, config)
    return response.data
}

export default { getAll, put, deleteOrder, createNew, getByRegion, getByRegionAndDate }
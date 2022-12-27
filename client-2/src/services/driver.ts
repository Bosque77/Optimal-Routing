import axios from 'axios'
import { Driver, NewDriver } from '../types'
import { Region } from '../types'
import { token } from './config'
const baseUrl = '/drivers'




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

const put = async (driver: Driver) => {
    const config = {
        headers: { Authorization: token },
    }
    const id = driver.id
    const url = baseUrl + `/${id}`
    await axios.put(url, driver, config)
    return driver
}


const deleteDriver = async (driver: Driver) => {
    const config = {
        headers: { Authorization: token },
    }
    const id = driver.id
    const url = baseUrl + `/${id}`
    const response = await axios.delete(url, config)
    return response
}

const createNew = async (driver: NewDriver) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, driver, config)
    return response.data
}

export default { getAll, put, deleteDriver, createNew, getByRegion }
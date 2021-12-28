
import axios from 'axios'
import { NewRegion } from '../types'
import { token } from './config'
const baseUrl = '/regions'




const getAll = async () => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.get(baseUrl,config)
    return response.data
}


const createNew = async (region:NewRegion) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl,region,config)
    return response.data
}

export default { getAll, createNew }
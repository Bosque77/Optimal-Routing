
import axios from 'axios'
// import RegionSelector from '../components/RegionSelector'
import { NewRegion, Region } from '../types'
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

const remove= async (region:Region) => {
    const config = {
        headers: { Authorization: token },
    }

    const url = baseUrl+`/${region.id}`
    const response = await axios.delete(url,config)
    return response.data
}



export default { getAll, createNew, remove }
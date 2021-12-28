import axios from 'axios'
// import { useSelector } from 'react-redux'
// import { State } from '../state'
import { Landfill, NewLandfill, Region } from '../types'
import {token} from './config'
const baseUrl = '/landfills'




const getByRegion = async (region:Region) => {
    const url = baseUrl+`/region/${region.id}`
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.get(url, config)
    return response.data
}


const getAll = async () => {
    if(token){
        const config = {
            headers: { Authorization: token },
        }
        console.log(config)
        const response = await axios.get(baseUrl, config)
        return response.data
    }else{
        throw('Cannot access landfills until the user token is present')
    }
}

const put = async (landfill: Landfill) => {
    const config = {
        headers: { Authorization: token },
    }

    const id = landfill.id
    const url = baseUrl + `/${id}`
    await axios.put(url, landfill, config)
    return landfill
}


const deleteLandfill = async (landfill: Landfill) => {
    console.log('inside the landfill services delete request')
    const id = landfill.id
    const url = baseUrl + `/${id}`
    const response = await axios.delete(url)
    return response
}

const createNew = async (landfill: NewLandfill) => {
    const response = await axios.post(baseUrl, landfill)
    console.log(response)
    return response.data
}

export default { getAll, put, createNew, deleteLandfill, getByRegion }
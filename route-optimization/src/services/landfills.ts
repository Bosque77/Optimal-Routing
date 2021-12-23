import axios from 'axios'
import { Landfill, NewLandfill } from '../types'

const baseUrl = 'http://localhost:3001/landfills'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const put = async (landfill:Landfill) => {
    console.log('inside the landfill services put request')
    const id = landfill.id
    const url = baseUrl+`/${id}`
    const response = await axios.put(url, landfill)
    return response.data
}


const deleteLandfill = async (landfill:Landfill) => {
    console.log('inside the landfill services delete request')
    const id = landfill.id
    const url = baseUrl+`/${id}`
    const response = await axios.delete(url)
    return response
}

const createNew = async (content:NewLandfill) => {
    const object = { content, important: false }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default { getAll, put, createNew, deleteLandfill }
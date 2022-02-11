import axios from 'axios'
import { RouteQuery } from '../types'

const baseUrl = 'https://ldryzqul7l.execute-api.us-west-1.amazonaws.com/createRoutes'
const getRoutesUrl = 'https://ldryzqul7l.execute-api.us-west-1.amazonaws.com/getRoutes'


const createRoutes = async (route_query:RouteQuery) => {
    const response = await axios.post(baseUrl,route_query)
    return response.data
}


const getRoutes = async () => {
    const response = await axios.get(getRoutesUrl)
    return response.data
}

export default {createRoutes, getRoutes}
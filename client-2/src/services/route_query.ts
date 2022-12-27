import axios from 'axios'
import { RouteQuery, Route_Item } from '../types'

const createRoutesUrl = 'https://ldryzqul7l.execute-api.us-west-1.amazonaws.com/createRoutes'
const getRoutesUrl = 'https://ldryzqul7l.execute-api.us-west-1.amazonaws.com/getRoutes'
const analyzeRoutesUrl = 'https://ldryzqul7l.execute-api.us-west-1.amazonaws.com/analyzeRoute'


const createRoutes = async (route_query: RouteQuery) => {
    const response = await axios.post(createRoutesUrl, route_query)
    return response.data
}


const getRoutes = async () => {
    const response = await axios.get(getRoutesUrl)
    return response.data
}

const analyzeRoute = async (route_items: Route_Item[]) => {
    console.log('inside analyzeRoute Service')
    console.log(JSON.stringify(route_items, null, 2))
    const response = await axios.post(analyzeRoutesUrl, route_items)
    return response.data


}




export default { createRoutes, getRoutes, analyzeRoute }
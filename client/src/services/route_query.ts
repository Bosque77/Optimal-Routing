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


    //// This function calls the google apps service to figure out distances on the front end. 
    // const service = new google.maps.DistanceMatrixService()
    // for (let i = 0; i < route_items.length - 1; i++) {
    //     const current_route_item = route_items[i]
    //     const next_route_item = route_items[i + 1]

    //     const origin = { lat: current_route_item.latitude, lng: current_route_item.longitude }
    //     const destination = { lat: next_route_item.latitude, lng: next_route_item.longitude }

    //     const request = {
    //         origins: [origin],
    //         destinations: [destination],
    //         travelMode: google.maps.TravelMode.DRIVING,
    //         unitSystem: google.maps.UnitSystem.METRIC,
    //         avoidHighways: false,
    //         avoidTolls: false,
    //     }

    //     service.getDistanceMatrix(request, (response) => console.log(response))

    // }




}




export default { createRoutes, getRoutes, analyzeRoute }
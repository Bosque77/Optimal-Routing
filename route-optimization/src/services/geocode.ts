import axios from 'axios'
import { Address, HttpResponse } from '../types'


const base_url = 'https://maps.googleapis.com/maps/api/geocode/json?address='


const get = async (address: Address): Promise<HttpResponse> => {
    console.log('inside geocode service .get')
    const street_split = address.street.split(' ')
    console.log(street_split)
    const parsed_street = street_split.reduce((prev_value, current_value) => `${prev_value}+${current_value}`, '')

    const url = base_url + `${parsed_street},+${address.city},+${address.state},+${address.zipcode}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`

    try {
        const response = await axios.get(url)
        console.log(response.data)
        const lat_lng = response.data.results[0].geometry.location
        const formatted_response: HttpResponse = {
            status: 'OK',
            message: '',
            data : lat_lng,
        }
        return formatted_response
    } catch {
        console.log('error in getting the HttpResponse')
        const formatted_response: HttpResponse = {
            status: 'ERROR',
            message: '',
            data : {},
        }
        return formatted_response
    }


}

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
// +Mountain+View,+CA&key=YOUR_API_KEY

export default { get }
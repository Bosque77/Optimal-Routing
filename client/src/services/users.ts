import axios from 'axios'
import { User } from '../types'

const baseUrl = '/users'


const login = async (user:User) => {
    const response = await axios.post(baseUrl, user)
    console.log(response)
    return response.data
}

export default { login }
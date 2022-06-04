import axios from 'axios'
import { LoginInfo, DriverToken } from '../types'
import {SERVER_URI} from '../utils/env_variables'

const baseUrl = SERVER_URI+'/driver-login'



const login = async (login_info:LoginInfo): Promise<DriverToken> => {
    const response = await axios.post(baseUrl, login_info)
    return response.data
}

export default { login }
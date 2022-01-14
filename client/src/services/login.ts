import axios from 'axios'
import { LoginInfo, UserToken } from '../types'


const baseUrl = '/login'



const login = async (login_info:LoginInfo): Promise<UserToken> => {
    const response = await axios.post(baseUrl, login_info)
    return response.data
}

export default { login }
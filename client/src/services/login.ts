import axios from 'axios'
import { LoginInfo, UserToken } from '../types'


const baseUrl = `${process.env.REACT_APP_BASE_URL}/login`
// const baseUrl = 'http://localhost:3001/login'


const login = async (login_info:LoginInfo): Promise<UserToken> => {
    console.log('inside loginService')
    const response = await axios.post(baseUrl, login_info)
    return response.data
}

export default { login }
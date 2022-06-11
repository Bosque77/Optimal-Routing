import axios, { AxiosError } from 'axios'
import { LoginInfo, ServerResponse, UserToken} from '../types'
import {SERVER_URI} from '../utils/env_variables'
const baseUrl = SERVER_URI+'/login-driver'
import {LoginResponse} from '../types'



console.log('test')


const login = async (login_info:LoginInfo): Promise<LoginResponse> => {
    console.log('inside the login service')
    try{
        const response = await axios.post(baseUrl, login_info)
        const user_token = response.data as UserToken
        return {
            status: 'SUCCESS',
            payload: user_token
        }
    }catch (error : any | AxiosError) {
        console.log('configuring the error payload')
        const error_obj =  {
            status: 'ERROR',
            payload: {},
            error_message : error.response.data.error 
        }

        throw error_obj
    }



}

export default { login }
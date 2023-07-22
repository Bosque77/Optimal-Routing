import axios from 'axios'
import {createSuccessResponse, createErrorResponse } from "./config";
import { LoginInfo, UserToken } from '../../../shared/types'


const baseUrl = '/api/login'
const googleLoginUrl = '/api/login/google'



const login = async (login_info:LoginInfo)  => {
    try{
        const response = await axios.post(baseUrl, login_info)
        return createSuccessResponse("Login Successful", response.data);
    } catch(error){
        return createErrorResponse("Login Failed", error)
    }
}

const googleLogin = async (google_credentials:string) => {
    try{
        const response = await axios.post(googleLoginUrl, {google_credentials})
        return createSuccessResponse("Google Credentials Received", response.data);
    } catch(error){
        return createErrorResponse("Google Credentials Failed", error)
    }

}


export default { login, googleLogin }
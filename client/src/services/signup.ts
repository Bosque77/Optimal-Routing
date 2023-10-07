
import axios from "axios";
import { NewUser, User } from "../../../shared/types";
import { token, createSuccessResponse, createErrorResponse } from "./config";

const baseUrl = "/api/sign-up";

const signUpUser = async (new_user: NewUser) => {
    try {
      const response = await axios.post(baseUrl+'/signup', new_user);
      console.log(response)
      console.log('inside success response')
      return createSuccessResponse("Create User Succeeded", response.data);
    } catch (error:any) {
      console.log('inside error response')
      console.log(error)
      let error_msg = error.response?.data?.message as string;
      console.log(error_msg)
      if(error_msg === undefined){
        return createErrorResponse("Create User Failed", error);
      }else{
        return createErrorResponse(error_msg, error);
      }
    }
  };

  export default {signUpUser}

import axios from "axios";
import { NewUser, User } from "../../../shared/types";
import { token, createSuccessResponse, createErrorResponse } from "./config";

const baseUrl = "/api/sign-up";

const signUpUser = async (new_user: NewUser) => {
    try {
      const response = await axios.post(baseUrl+'/signup', new_user);
      console.log(response)
      return createSuccessResponse("Create User Succeeded", response.data);
    } catch (error) {
      return createErrorResponse("Create User Failed", error);
    }
  };

  export default {signUpUser}
import axios from "axios";
import { NewUser } from "../../../shared/types";
import { createSuccessResponse, createErrorResponse } from "./config";

const baseUrl = "/api/users";

// const login = async (user: User) => {
//   const response = await axios.post(baseUrl, user);
//   console.log(response);
//   return response.data;
// };


const signUpUser = async (new_user: NewUser) => {
  try {
    const response = await axios.post(baseUrl+'/signup', new_user);
    return createSuccessResponse("Google Credentials Received", response.data);
  } catch (error) {
    return createErrorResponse("Google Credentials Failed", error);
  }
};

export default { signUpUser };

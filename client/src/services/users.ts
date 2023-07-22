import axios from "axios";
import { NewUser, User } from "../../../shared/types";
import { token, createSuccessResponse, createErrorResponse } from "./config";

const baseUrl = "/api/users";


const getConfig = () => {
  const config = {
    headers: { Authorization: token },
  };
  return config;
};

const getUserData = async () => {
  try {
    const response = await axios.get(baseUrl, getConfig());
    return createSuccessResponse("Get User Succeeded", response.data);
  } catch (error) {
    return createErrorResponse("Get User Failed", error);
  }
};

const updateUser = async (user: User) => {
  try {
    const response = await axios.put(baseUrl, user, getConfig());
    return createSuccessResponse("Update User Succeeded", response.data);
  } catch (error) {
    return createErrorResponse("Update User Failed", error);
  }
};




export default {  getUserData, updateUser };

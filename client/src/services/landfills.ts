import axios from "axios";
import { HttpResponse, Landfill, NewLandfill, Region } from "../types";
import { token } from "./config";
const baseUrl = "/landfills";

// const getByRegion = async (region:Region) => {
//     const url = baseUrl+`/region/${region.id}`
//     const config = {
//         headers: { Authorization: token },
//     }
//     const response = await axios.get(url, config)
//     return response.data
// }

const getByRegion = async (region: Region) => {
  const url = baseUrl + `?region_id=${region.id}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(url, config);
  return response.data;
};

const getAll = async () => {
  if (token) {
    const config = {
      headers: { Authorization: token },
    };
    console.log(config);
    const response = await axios.get(baseUrl, config);
    return response.data;
  } else {
    throw "Cannot access landfills until the user token is present";
  }
};

const put = async (landfill: Landfill) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const id = landfill.id;
    const url = baseUrl + `/${id}`;
    const axios_response = await axios.put(url, landfill, config);
    const response: HttpResponse = {
      status: "OK",
      message: "landfill updated",
      data: axios_response.data,
    };
    return response;
  } catch (error) {
    const response: HttpResponse = {
      status: "ERROR",
      message: "landfill creation failed",
      data: error,
    };
    return response;
  }
};

const deleteLandfill = async (landfill: Landfill) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const id = landfill.id;
    const url = baseUrl + `/${id}`;
    console.log('inside the delete service')
    const axios_response = await axios.delete(url, config);
    console.log(axios_response)
    console.log('sending back axios response')
    return createSuccessResponse("Landfill updated", axios_response.data);
  } catch (error) {
    return createErrorResponse("Landfill update failed", error);
  }  
};

const createNew = async (landfill: NewLandfill) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const axios_response = await axios.post(baseUrl, landfill, config);
    const response: HttpResponse = {
      status: "OK",
      message: "landfill created",
      data: axios_response.data,
    };
    return response;
  } catch (error) {
    const response: HttpResponse = {
      status: "ERROR",
      message: "landfill creation failed",
      data: error,
    };
    return response;
  }
};


const createSuccessResponse = (message: string, data: any): HttpResponse => {
  return {
    status: "OK",
    message,
    data,
  };
};

const createErrorResponse = (message: string, error: any): HttpResponse => {
  let errorMessage = message;
  if (error.response) {
    errorMessage += `: ${error.response.statusText} (${error.response.status})`;
  } else if (error.request) {
    errorMessage += ": No response received";
  } else {
    errorMessage += `: ${error.message}`;
  }

  return {
    status: "ERROR",
    message: errorMessage,
    data: error,
  };
};

export default { getAll, put, createNew, deleteLandfill, getByRegion };

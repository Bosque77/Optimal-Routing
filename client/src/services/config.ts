import { HttpResponse } from "../../../shared/types";

export let token = ''

export const setToken = (newToken:string | null) => {
    token = `bearer ${newToken}`
}

export const createSuccessResponse = (message: string, data: any): HttpResponse => {
    return {
      status: "OK",
      message,
      data,
    };
  };
  
 export const createErrorResponse = (message: string, error: any): HttpResponse => {
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
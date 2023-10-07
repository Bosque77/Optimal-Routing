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
    return {
      status: "ERROR",
      message: message,
      data: error,
    };
  };

  
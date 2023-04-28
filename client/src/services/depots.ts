import axios from "axios";
import { Depot, HttpResponse, NewDepot, Region } from "../../../shared/types";
import { token, createSuccessResponse, createErrorResponse } from "./config";
const baseUrl = "/depots";

const getByRegion = async (region: Region) => {
  try {
    const url = baseUrl + `?region_id=${region.id}`;
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(url, config);
    return createSuccessResponse("Depots retrieved", response.data);
  } catch (error) {
    return createErrorResponse("Depot retrieval failed", error);
  }
};

const getAll = async () => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(baseUrl, config);
    return createSuccessResponse("Depots retrieved", response.data);
  } catch (error) {
    return createErrorResponse("Depot retrieval failed", error);
  }
};

const put = async (depot: Depot) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const id = depot.id;
    const url = baseUrl + `/${id}`;
    const axios_response = await axios.put(url, depot, config);
    return createSuccessResponse("Depot updated", axios_response.data);
  } catch (error) {
    return createErrorResponse("Depot update failed", error);
  }
};

const deleteDepot = async (depot: Depot) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const id = depot.id;
    const url = baseUrl + `/${id}`;
    const axios_response = await axios.delete(url, config);
    return createSuccessResponse("Depot deleted", axios_response.data);
  } catch (error) {
    return createErrorResponse("Depot deletion failed", error);
  }
};

const createNew = async (depot: NewDepot) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const axios_response = await axios.post(baseUrl, depot, config);
    return createSuccessResponse("Depot created", axios_response.data);
  } catch (error) {
    return createErrorResponse("Depot creation failed", error);
  }
};

export default { getAll, put, createNew, deleteDepot, getByRegion };

import axios from "axios";
import { HttpResponse, NewTruckRoute, TruckRoute, Region } from "../../../shared/types";
import { token, createSuccessResponse, createErrorResponse } from "./config";
const baseUrl = "/routes";

const getConfig = () => ({
  headers: { Authorization: token },
});

const getByRegion = async (region: Region) => {
  try {
    const url = baseUrl + `?region_id=${region.id}`;
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(url, config);
    return createSuccessResponse("Routes retrieved", response.data);
  } catch (error) {
    return createErrorResponse("Route retrieval failed", error);
  }
};



const getByRegionAndDate = async (region: Region, date: string) => {
  try {
    const url = baseUrl + "/date";
    const config = {
            ...getConfig(),
            params: { date: date, region: region.id },
          };
    const response = await axios.get(url, config);
    return createSuccessResponse("Routes retrieved", response.data);
  } catch (error) {
    return createErrorResponse("Route retrieval failed", error);
  }
};

const getAll = async () => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(baseUrl, config);
    return createSuccessResponse("Routes retrieved", response.data);
  } catch (error) {
    return createErrorResponse("Route retrieval failed", error);
  }
};

const put = async (truck_route: TruckRoute) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const id = truck_route.id;
    const url = baseUrl + `/${id}`;
    const axios_response = await axios.put(url, truck_route, config);
    return createSuccessResponse("Route updated", axios_response.data);
  } catch (error) {
    return createErrorResponse("Route update failed", error);
  }
};

const deleteOrder = async (truck_route: TruckRoute) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const id = truck_route.id;
    const url = baseUrl + `/${id}`;
    const axios_response = await axios.delete(url, config);
    return createSuccessResponse("Route deleted", axios_response.data);
  } catch (error) {
    return createErrorResponse("Route deletion failed", error);
  }
};

const createNew = async (truck_route: NewTruckRoute) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, truck_route, config);
    return createSuccessResponse("Route created", response.data);
  } catch (error) {
    return createErrorResponse("Route creation failed", error);
  }
};

export default {
  getAll,
  put,
  deleteOrder,
  createNew,
  getByRegion,
  getByRegionAndDate,
};

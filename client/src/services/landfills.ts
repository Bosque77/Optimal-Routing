import axios from "axios";
import { Landfill, NewLandfill, Region } from "../types";
import { token, createSuccessResponse, createErrorResponse } from "./config";
const baseUrl = "/landfills";

const getByRegion = async (region: Region) => {
  try {
    const url = baseUrl + `?region_id=${region.id}`;
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(url, config);
    return createSuccessResponse("Landfills retrieved", response.data);
  } catch (error) {
    return createErrorResponse("Landfill update failed", error);
  }
};

const getAll = async () => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(baseUrl, config);
    return createSuccessResponse("Landfills retrieved", response.data);
  } catch (error) {
    return createErrorResponse("Landfill update failed", error);
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
    return createSuccessResponse("Landfill updated", axios_response.data);
  } catch (error) {
    return createErrorResponse("Landfill update failed", error);
  }
};

const deleteLandfill = async (landfill: Landfill) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const id = landfill.id;
    const url = baseUrl + `/${id}`;
    const axios_response = await axios.delete(url, config);
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
    return createSuccessResponse("Landfill created", axios_response.data);
  } catch (error) {
    return createErrorResponse("Landfill creation failed", error);
  }
};

export default { getAll, put, createNew, deleteLandfill, getByRegion };

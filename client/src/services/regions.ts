import axios from "axios";
// import RegionSelector from '../components/RegionSelector'
import { NewRegion, Region, HttpResponse } from "../../../shared/types";
import { token, createErrorResponse, createSuccessResponse } from "./config";

const baseUrl = "/api/regions";

const getConfig = () => {
  const config = {
    headers: { Authorization: token },
  };
  return config;
};

const getAll = async ():Promise<HttpResponse> => {
  console.log('inside my region service to get all')
  try {
  console.log('logging the regions request to get all regions')
  console.log(getConfig())

    const axios_response = await axios.get(baseUrl, getConfig());
    return createSuccessResponse("Got All Regions", axios_response.data);
  } catch (error) {
    return createErrorResponse("Get Regions Failed", error);
  }
};

const createNew = async (region: NewRegion):Promise<HttpResponse> =>  {
  try {
    const axios_response = await axios.post(baseUrl, region, getConfig());
    return createSuccessResponse("New Region Created", axios_response.data);
  } catch (error) {
    return createErrorResponse("Create Region Failed", error);
  }
};

const deleteRegion = async (region: Region):Promise<HttpResponse> => {
  try {
    console.log('inside the delete region service on client')
    const url = baseUrl + `/${region.id}`;
    const response = await axios.delete(url, getConfig());
    console.log(response)
    return createSuccessResponse("Region Deleted", response.data);
  } catch (error) {
    return createErrorResponse("Delete Region Failed", error);
  }
};

export default { getAll, createNew, deleteRegion };

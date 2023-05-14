import axios from "axios";
import { token, createSuccessResponse, createErrorResponse } from "./config";
import { RouteQuery, Route_Item } from "../../../shared/types";

const createRoutesUrl =
  "https://99vqvr7812.execute-api.us-west-1.amazonaws.com/createRoutes";
const getRoutesUrl =
  "https://99vqvr7812.execute-api.us-west-1.amazonaws.com/getRoutes";
const analyzeRoutesUrl =
  "https://99vqvr7812.execute-api.us-west-1.amazonaws.com/analyzeRoute";

const createRoutes = async (route_query: RouteQuery) => {
  try {
    const response = await axios.post(createRoutesUrl, route_query);
    console.log(response.data)
    return createSuccessResponse("Route generation successful", response.data)
  } catch (error) {
    return createErrorResponse(
      `Route generation failed for route query: ${route_query}`,
      error
    );
  }
};

const getRoutes = async () => {
  try{
    const response = await axios.get(getRoutesUrl);
    console.log(response.data)
    return createSuccessResponse("Get Routes Successful", response.data)
  } catch (error) {
    return createErrorResponse(
      `Get Routes Failed`,
      error
    );
  }
};

const analyzeRoute = async (route_items: Route_Item[]) => {
  try{
    const response = await axios.post(analyzeRoutesUrl, route_items);
    console.log(response.data)
    return createSuccessResponse("Analyze Route Successful", response.data)
  } catch (error) {
    return createErrorResponse(
      `Analyze Route Failed`,
      error
    );
  }
};

export default { createRoutes, getRoutes, analyzeRoute };

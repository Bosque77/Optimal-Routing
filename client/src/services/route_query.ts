import axios from "axios";
import { token, createSuccessResponse, createErrorResponse } from "./config";
import { RouteQuery, Route_Item } from "../../../shared/types";

const createRoutesUrl =
  "https://99vqvr7812.execute-api.us-west-1.amazonaws.com/createRoutes";
const getRoutesUrl =
  "https://f6vrxsc1l7.execute-api.us-west-1.amazonaws.com/Prod/getRoutes";
const analyzeRoutesUrl =
  "https://f6vrxsc1l7.execute-api.us-west-1.amazonaws.com/Prod/analyzeRoute";

const createRoutes = async (route_query: RouteQuery) => {
  try {
    const response = await axios.post(createRoutesUrl, route_query);
    console.log(response.data)
    return response.data;
  } catch (error) {
    return createErrorResponse(
      `Route generation failed for route query: ${route_query}`,
      error
    );
  }
};

const getRoutes = async () => {
  const response = await axios.get(getRoutesUrl);
  return response.data;
};

const analyzeRoute = async (route_items: Route_Item[]) => {
  console.log("inside analyzeRoute Service");
  console.log(JSON.stringify(route_items, null, 2));
  const response = await axios.post(analyzeRoutesUrl, route_items);
  return response.data;
};

export default { createRoutes, getRoutes, analyzeRoute };

import axios from "axios";
import { NewOrder, Order, Region } from "../../../shared/types";
import { token, createSuccessResponse, createErrorResponse } from "./config";
const baseUrl = "/api/orders";

const getConfig = () => ({
  headers: { Authorization: token },
});



const getNumOfOrders = async (region_id: string, date: string) => {
  try {
    const url = baseUrl + "/num_of_orders";
    const config = {
      ...getConfig(),
      params: { date: date, region_id: region_id },
    };
    const response = await axios.get(url, config);
    return createSuccessResponse("Orders retrieved", response.data['num_of_orders']);
  } catch (error) {
    return createErrorResponse(
      `Order retrieval failed for region id: ${region_id} and date: ${date}`,
      error
    );
  }
};



const getByRegion = async (region: Region) => {
  try {
    const url = baseUrl + `?region_id=${region.id}`;
    const response = await axios.get(url, getConfig());
    return createSuccessResponse("Orders retrieved", response.data);
  } catch (error) {
    return createErrorResponse(
      `Order retrieval failed for region id: ${region.id}`,
      error
    );
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
    return createSuccessResponse("Orders retrieved", response.data);
  } catch (error) {
    return createErrorResponse(
      `Order retrieval failed for region id: ${region.id} and date: ${date}`,
      error
    );
  }
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl, getConfig());
    return createSuccessResponse("Orders retrieved", response.data);
  } catch (error) {
    return createErrorResponse("Order retrieval failed", error);
  }
};

const put = async (order: Order) => {
  try {
    const id = order.id;
    const url = baseUrl + `/${id}`;
    const axios_response = await axios.put(url, order, getConfig());
    return createSuccessResponse("Order updated", axios_response.data);
  } catch (error) {
    return createErrorResponse(
      `Order update failed for order id: ${order.id}`,
      error
    );
  }
};

const deleteOrder = async (order: Order) => {
  try {
    const id = order.id;
    const url = baseUrl + `/${id}`;
    const axios_response = await axios.delete(url, getConfig());
    return createSuccessResponse("Order deleted", axios_response.data);
  } catch (error) {
    return createErrorResponse("Order deletion failed", error);
  }
};

const createNew = async (order: NewOrder) => {
  try {
    const axios_response = await axios.post(baseUrl, order, getConfig());
    return createSuccessResponse("Order created", axios_response.data);
  } catch (error) {
    return createErrorResponse("Order creation failed", error);
  }
};

export default {
  getNumOfOrders,
  getAll,
  put,
  deleteOrder,
  createNew,
  getByRegion,
  getByRegionAndDate,
};

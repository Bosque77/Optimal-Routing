import axios from "axios";
import { NewUser, User } from "../../../shared/types";
import { token, createSuccessResponse, createErrorResponse } from "./config";
import { Card } from "@stripe/stripe-js";

const baseUrl = "/api/stripe";


const getConfig = () => {
  const config = {
    headers: { Authorization: token },
  };
  return config;
};

const attachPaymentMethod = async (payment_id: string) => {
    try {
      const config = {
        headers: { Authorization: token },
      };

      const axios_response = await axios.post(baseUrl, payment_id, config);
      return createSuccessResponse("payment method created", axios_response.data);
    } catch (error) {
      return createErrorResponse("payment creation failed", error);
    }
  };


  export default { attachPaymentMethod };
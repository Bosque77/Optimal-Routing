import express from "express";

import asyncHandler from "express-async-handler";

const stripeRouter = express.Router();

// const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

// stripeRouter.get(
//   "/payment-methods",
//   asyncHandler(async (req, res) => {
//     const user = req.user;
//     const user_id = user._id as string;



//     const paymentMethods = await stripe.paymentMethods.list({
//       customer: customerId,
//       type: "card",
//     });

//     res.json(paymentMethods.data);
//   })
// );

stripeRouter.get(
  "/payment-methods",
  asyncHandler(async (_req, res) => {
    res.send("hello")
  })
);



export default stripeRouter;

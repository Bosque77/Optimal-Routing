import express, { Request, Response } from "express";
import orderService from "../services/order-service";
import { UserType } from "../types";
import asyncHandler from "express-async-handler";
import * as z from "zod";

const orderRouter = express.Router();

const orderSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  dumpster_size: z.number(),
  delivery_date: z.string(),
  pickup_date: z.string(),
  special_instructions: z.string(),
  delivery_completed: z.boolean(),
  pickup_completed: z.boolean(),
  active: z.boolean(),
  user_id: z.string(),
});


// create order
orderRouter.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as UserType;
    const user_id = user._id as string;
    const new_order = orderSchema.parse(req.body);
    const order_object = await orderService.createOrder(new_order, user_id);
    res.status(200).send(order_object);
  })
);

// get orders by region and date
orderRouter.get(
  "/date",
  asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as UserType;
    const user_id = user._id;
    const region_id = req.query.region as string;
    const date = req.query.date as string;
    const orders = await orderService.getEntriesByRegionAndDate(
      user_id,
      region_id,
      date
    );
    res.status(200).send(orders);
  })
);

// change order
orderRouter.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const updated_order = orderSchema.parse(req.body);
    const order_id = req.params.id;
    const order = await orderService.updateOrder(order_id, {
      ...updated_order,
    });
    res.status(200).send(order);
  })
);

// delete order
orderRouter.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const order_id = req.params.id;
    await orderService.deleteOrder(order_id);
    res.status(204);
  })
);



export default orderRouter;

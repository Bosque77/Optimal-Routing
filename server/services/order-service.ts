import Order from "../models/order-model";
import * as mongoDB from "mongodb";

const getNumOfOrders = async (
  user_id: string,
  region_id: string,
  date: string
) => {
  // looks up orders from mongodb by using the user_id, region_id and date
  // returns the number of orders
  const order_number = (await Order.countDocuments({
    user_id: user_id,
    region_id: region_id,
    $or: [{ delivery_date: date }, { pickup_date: date }],
  })) as unknown as number;
  return order_number;
};

const getEntriesByRegionAndDate = async (
  user_id: string,
  region_id: string,
  date: string
) => {
  console.log(region_id);
  console.log(date);

  // looks up orders from mongodb by using the user_id, region_id and date
  // returns an array of orders
  const orders = (await Order.find({
    user_id: user_id,
    region_id: region_id,
    $or: [{ delivery_date: date }, { pickup_date: date }],
  })) as unknown as mongoDB.Collection;
  return orders;
};

const updateOrder = async (order_id: string, updated_order: any) => {
  // updates an order in the database
  // returns the updated order
  const order = await Order.findByIdAndUpdate(
    order_id,
    { ...updated_order },
    { new: true }
  );
  return order;
};

const deleteOrder = async (order_id: string) => {
  // deletes an order from the database
  await Order.findByIdAndDelete(order_id);
};

const createOrder = async (new_order: any, user_id: string) => {
  // creates an order in the database
  // returns the created order
  const query = new Order({
    ...new_order,
    user_id: user_id,
    delivery_completed: false,
    pickup_completed: false,
    active: true,
    type: "Order",
  });
  const order_object = await query.save();
  return order_object;
};

export default {
  getEntriesByRegionAndDate,
  updateOrder,
  deleteOrder,
  createOrder,
  getNumOfOrders,
};

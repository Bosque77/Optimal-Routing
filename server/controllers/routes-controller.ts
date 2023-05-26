import express from "express";
import Route from "../models/route-model";
import routeService from "../services/route-service";
import asyncHandler from "express-async-handler";

const routeRouter = express.Router();



routeRouter.get(
  "/date",
  asyncHandler(async (req: any, res) => {
    console.log("inside get routes");
    try {
      const user = req.user;
      const user_id = user._id;
      const region_id = req.query.region as string;
      const date = req.query.date as string;
      const routes = await routeService.getEntriesByRegionAndDate(
        user_id,
        region_id,
        date
      );
      console.log('logging the routes recieved from mongo db')
      console.log(routes)
      res.status(200).send(routes);
    } catch (error) {
      res
        .status(500)
        .send("Error getting the order entries by user and region");
    }
  })
);

routeRouter.put("/:id", async (req: any, res) => {
  console.log("inside route put request");
  try {
    const updated_route = req.body;
    const route_id = req.params.id;
    const route = await Route.findByIdAndUpdate(route_id, { ...updated_route },    { new: true });
    res.status(200).send(route);
  } catch (error) {
    res.status(500).send("Error saving the order");
  }
});

routeRouter.delete("/:id", async (req: any, res) => {
  console.log("inside order delete request");
  try {
    const order_id = req.params.id;
    await Route.findByIdAndDelete(order_id);
    res.status(200).send("order deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting the order");
  }
});

routeRouter.post("/", async (req: any, res) => {
  try {
    const user = req.user;
    const user_id = user._id as string;
    const new_route = req.body;
    const order_object = new Route({ ...new_route, user_id: user_id });
    const returned_data = await order_object.save();
    res.status(200).send(returned_data);
  } catch (error) {
    res.status(500).send("Error getting the order entries by user and region");
  }
});

export default routeRouter;

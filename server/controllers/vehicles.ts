import express from "express";
import vehicleService from "../services/vehicleService";
import { Request, Response } from "express";
import { UserType } from "../types";
import asyncHandler from "express-async-handler";
import * as z from 'zod'

const vehicleSchema = z.object({
    license_number: z.string(),
    size: z.number(),
    start_depot: z.string(),
    active: z.boolean(),
    user_id: z.string(),
    region_id: z.string()
})

const vehicleRouter = express.Router();

// create vehicle
vehicleRouter.post(
  "/",
  asyncHandler(async (req: any, res) => {
    const user = req.user as UserType;
    const user_id = user._id as string;
    const new_vehicle = vehicleSchema.parse(req.body);
    const populated_vehicle = await vehicleService.createVehicle(
      new_vehicle,
      user_id
    );
    res.status(200).send(populated_vehicle);
  })
);

// get vehicles by user and region
vehicleRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as UserType;
    const user_id = user._id as string;
    const region_id = req.query.region_id as string;
    const vehicles = await vehicleService.getVehiclesByUserAndRegion(
      user_id,
      region_id
    );
    res.status(200).send(vehicles);
  })
);

// update vehicle
vehicleRouter.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const updated_vehicle = vehicleSchema.parse(req.body);
    const vehicle_id = req.params.id;
    await vehicleService.updateVehicle(vehicle_id, { ...updated_vehicle });
    const populated_vehicle = await vehicleService.getVehicleById(vehicle_id);
    res.status(200).send(populated_vehicle);
  })
);

// delete vehicle
vehicleRouter.delete(
  "/:id",
  asyncHandler(async (req: any, res) => {
    const vehicle_id = req.params.id;
    await vehicleService.deleteVehicleById(vehicle_id);
    res.status(204);
  })
);

export default vehicleRouter;

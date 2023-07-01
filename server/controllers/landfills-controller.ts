import express, {Request, Response} from "express";
import landfillService from "../services/landfill-service";
import asyncHandler from "express-async-handler";
import { UserType } from "../types";
import * as z from "zod";


const landfillSchema = z.object({
    name: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    region_id: z.string(),
    type: z.string()
})

const landfillRouter = express.Router();

// get number of landfills 
landfillRouter.get("/num_of_landfills", asyncHandler(async (request: Request, response: Response) => {
    console.log('getting the number of landfills')
    const user = request.user as UserType;
    const user_id = user._id as string;
    const region_id = request.query.region_id as string;
    console.log('logging info in the landfill router')
    console.log(user_id)
    console.log(region_id)
    console.log(request.query)
    const num_of_landfills = await landfillService.getNumOfLandfills(user_id, region_id);
    console.log(num_of_landfills)
    response.status(200).json( {num_of_landfills});
}))



// get all of the landfills for the user and region specified
landfillRouter.get(
  "/",
  asyncHandler(async (request: Request, response: Response) => {
    const user = request.user as UserType;
    const user_id = user._id as string;
    const region_id = request.query.region_id as string;
    const landfills = await landfillService.getEntriesByRegionAndUser(
      user_id,
      region_id
    );
    response.status(200).send(landfills);
  })
);

// change landfill
landfillRouter.put("/:id", asyncHandler(async (request: Request, response: Response) => {
    const updated_landfill = request.body;
    const landfill_id = request.params.id;
    const landfill = await landfillService.updateLandfill(landfill_id, updated_landfill);
    response.status(200).send(landfill);
}))

// delete landfill
landfillRouter.delete("/:id", asyncHandler(async (request: Request, response: Response) => {
    const landfill_id = request.params.id;
    const landfill = await landfillService.deleteLandfill(landfill_id);
    if (!landfill) response.status(404).send("landfill not found")
    response.status(204).send()
}));

// create new landfill
landfillRouter.post("/", asyncHandler(async (request: Request, response: Response) => {
    const user = request.user as UserType;
    const user_id = user._id as string;
    const new_landfill = landfillSchema.parse(request.body);
    const returned_data = await landfillService.createLandfill(new_landfill, user_id);
    response.status(200).send(returned_data);
}));

export default landfillRouter;

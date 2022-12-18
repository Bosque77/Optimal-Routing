import express, { Request, Response } from "express";
import * as t from 'io-ts';
import orderService from "../services/orderService";
import { UserType } from "../types";
import asyncHandler from "express-async-handler";


const orderRouter = express.Router();

const UserType = t.type({
    // Declare the properties and methods that the req.user object should have
    _id: t.string,
  });


orderRouter.get('/date', asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as UserType;
    if (!user){
        // throw error if user does not exist
        throw new Error {name : "UserError"}; 
    }else {
        console.log('testing from here')
        const user_id = user._id;
        const region_id = req.query.region as string;
        const date = req.query.date as string;
        const orders = await orderService.getEntriesByRegionAndDate(user_id,region_id,date);
        res.status(200).send(orders)
    }

}))



export default orderRouter;
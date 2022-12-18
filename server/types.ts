import { Request } from "express";


export interface NewUser {
    username: string,
    password: string,
}

export interface NewLandfill{
    name: string,
    street: string,
    city: string,
    state: string,
    zipcode: number,
    latitude: number,
    longitude: number,
    active: boolean,
    user_id: string,
    region_id: string,
    type:string
}


export interface NewDriver {
    name: string;
    phone_number: string;
    email: string;
    password: string;
    active: boolean;
    user_id: string;
    region_id: string;
}

export interface NewDepot {
    name: string,
    street: string,
    city: string,
    state: string,
    zipcode: number,
    latitude: number,
    longitude: number,
    active: boolean,
    user_id: string,
    region_id: string,
    type:string
}

export interface UserType {
    _id: string,
}

export interface UserRequest extends Request {
    user: UserType
}


export interface IOrder {
    name: string,
    email: string,
    phone_number: string,
    street: string,
    city: string,
    state: string,
    zipcode: number,
    latitude: number,
    longitude: number,
    dumpster_size: number,
    delivery_date: string,
    pickup_date: string,
    delivery_time?: {
        hour: number,
        minute: number,
        am_pm: string,
    },
    pickup_time?: {
        hour: number,
        minute: number,
        am_pm: string,
    },
    special_instructions?: string,
    delivery_completed: boolean,
    pickup_completed: boolean,
    active: boolean,
    user_id: string,
    region_id: string,
    type: string
}
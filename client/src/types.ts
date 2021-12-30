
export interface LatLng  {
    lat: number,
    lng: number
}

export interface Landfill {
    id: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zipcode: number;
    latitude: number;
    longitude: number;
    active: boolean;
    user_id: string;
    region_id:string;
}

export interface Depot {
    id: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zipcode: number;
    latitude: number;
    longitude: number;
    active: boolean;
    user_id: string;
    region_id:string;
}

export interface Driver {
    id: string;
    name: string;
    phone_number: string;
    email: string;
    active: boolean;
    user_id: string;
    region_id:string;
}

export interface Vehicle {
    id: string;
    start_depot: Depot;
    end_depot?: Depot;
    license_number: string;
    size: number;
    active: boolean;
    user_id: string;
    region_id: string;
}


export interface Region {
    id: string;
    name:string;
    user_id:string;
}



export interface Address {
    street: string;
    city: string;
    state: string;
    zipcode: number
}

type Status = 'OK' | 'ERROR'



export interface HttpResponse {
    status: Status;
    message: string,
    data: unknown
}


export interface NewLandfill {
    name: string;
    street: string;
    city: string;
    state: string;
    zipcode: number;
    latitude: number;
    longitude: number;
    active: boolean;
    region_id:string;
}

export interface NewDepot {
    name: string;
    street: string;
    city: string;
    state: string;
    zipcode: number;
    latitude: number;
    longitude: number;
    active: boolean;
    region_id:string;
}

export interface NewVehicle {
    start_depot: string;
    end_depot?: string;
    license_number: string;
    size: number;
    active: boolean;
    region_id: string;
}

export interface NewRegion {
    name: string;
}

export interface User {
    username: string;
    password: string;
}

export interface NewDriver {
    name: string;
    phone_number: string;
    email: string;
    region_id:string;
}

export interface LoginInfo {
    username: string;
    password: string;
}

export interface UserToken {
    token: string;
    username: string;
}
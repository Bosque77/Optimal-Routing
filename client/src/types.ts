
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

export interface NewRegion {
    name: string;
}

export interface User {
    username: string;
    password: string;
}

export interface LoginInfo {
    username: string;
    password: string;
}

export interface UserToken {
    token: string;
    username: string;
}
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
export interface RouteQuery {
    landfills: Landfill[]
    depots: Depot[]
    vehicles: Vehicle[]
    orders: Order[]
}


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

export interface Order {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    street: string;
    city: string;
    state: string;
    zipcode: number;
    latitude: number;
    longitude: number;
    dumpster_size: number;
    delivery_date: string;
    pickup_date: string;
    delivery_time?: Time;
    pickup_time?: Time;
    special_instructions: string;
    delivery_completed: boolean;
    pickup_completed: boolean;
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


export interface Time {
    hour: number;
    minute: number;
    am_pm: 'AM' | 'PM';
}
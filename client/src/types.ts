
export interface DbReturnedRouteData {
    distances: number[]
    durations: number[]
    route_objects: Route_Item[]
    total_distance: number
    total_duration: number
}

export interface DbResponse {
    routes: DbReturnedRouteData[]
    total_distance: number
    total_duration:number
}



export interface TruckRoute {
    id: string
    route_types: string[]
    route_items: string[]
    distances: number[]
    durations: number[]
    total_distance: number
    total_duration: number
    date: string
    region_id: string
    driver?: Driver 
    driver_id?: string
}

export interface NewTruckRoute {
    route_types: string[]
    route_items: string[]
    distances: number[]
    durations: number[]
    total_distance: number
    total_duration: number
    date: string
    region_id: string
}



export interface RouteQuery {
    landfills: Landfill[]
    depots: Depot[]
    orders: Order[]
    date: string
    num_of_routes: number
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
    type:'Landfill'
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
    type:'Depot'
}


export interface Time {
    hour: number;
    minute: number;
    am_pm: 'AM' | 'PM';
}

export type Dumpster_Sizes = 10 | 15 | 20 | 30 | 40 | 50


export type Route_Item = Order | Depot | Landfill


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
    order_type?:string;
    type:'Order'
}

export interface NewOrder {
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
    type:'Order';
    special_instructions: string;
    delivery_completed: boolean;
    pickup_completed: boolean;
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
    type:'Landfill';
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
    type:'Depot';
    active: boolean;
    region_id:string;
}

export interface EditVehicle {
    id: string;
    start_depot: string;
    end_depot?: string | null;
    license_number: string;
    size: number;
    active: boolean;
    region_id: string;
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
    password: string;
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
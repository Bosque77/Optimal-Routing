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
    data: Record<string,unknown>
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
}
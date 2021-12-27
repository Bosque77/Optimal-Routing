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
    region_name: string,
}
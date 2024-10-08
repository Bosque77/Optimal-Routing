import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

export interface LoginInfo {
    email: string;
    password: string;
}

export interface UserToken {
    token: string;
    email: string;
}

export interface Order {
    id: string,
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
    delivery_time?:{
        hour: number,
        minute: number,
        am_pm: string
    },
    pickup_time?:{
        hour: number,
        minute: number,
        am_pm: string
    },
    special_instructions: string,
    delivery_completed: boolean,
    pickup_completed: boolean,
    user_id: string,
    region_id: string,
    type: string
}



export type ServerResponse<PayloadType> =  {
    status: 'SUCCESS' | 'ERROR',
    payload: PayloadType,
    error_message?:string,
}

export type ErrorResponse = ServerResponse<{}>

export type LoginResponse  = ServerResponse<UserToken | {}>


export type RootStackParamList = {
    Home: undefined;
    OrderDetails:undefined
    Profile: { userId: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
};

export type Navigation = NativeStackNavigationProp<RootStackParamList,'Profile'>


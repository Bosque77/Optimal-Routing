export interface LoginInfo {
    email: string;
    password: string;
}

export interface UserToken {
    token: string;
    email: string;
}



export type ServerResponse<PayloadType> =  {
    status: 'SUCCESS' | 'ERROR',
    payload: PayloadType,
    error_message?:string,
}

export type ErrorResponse = ServerResponse<{}>

export type LoginResponse  = ServerResponse<UserToken | {}>
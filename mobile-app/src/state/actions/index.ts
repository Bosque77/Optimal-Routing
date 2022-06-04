import { DriverToken } from "../../types";
import { ActionType } from "../action-types";

interface SET_DRIVER_TOKEN {
    type: ActionType.SET_USER_TOKEN;
    data: (DriverToken | null)
}


export type Action = SET_DRIVER_TOKEN
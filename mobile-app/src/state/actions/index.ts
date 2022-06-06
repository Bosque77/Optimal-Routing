import { UserToken } from "../../types";
import { ActionType } from "../action-types";

interface SET_USER_TOKEN {
    type: ActionType.SET_USER_TOKEN;
    data: (UserToken | null)
}


export type Action = SET_USER_TOKEN
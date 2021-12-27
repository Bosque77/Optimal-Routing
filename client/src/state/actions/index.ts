import { Landfill, UserToken, Region } from '../../types'
import { ActionType } from '../action-types'



interface ADD_LANDFILL {
    type: ActionType.ADD_LANDFILL;
    data: Landfill
}

interface UPDATE_LANDFILL {
    type: ActionType.UPDATE_LANDFILL;
    data: Landfill
}

interface INIT_LANDFILLS {
    type: ActionType.INIT_LANDFILLS;
    data: Landfill[]
}

interface DELETE_LANDFILL {
    type: ActionType.DELETE_LANDFILL;
    data: Landfill
}

interface SET_USER_TOKEN {
    type: ActionType.SET_USER_TOKEN;
    data: UserToken
}


interface INIT_REGIONS {
    type:ActionType.INIT_REGIONS,
    data: Region[]
}

export type Action = ADD_LANDFILL | UPDATE_LANDFILL | INIT_LANDFILLS | DELETE_LANDFILL | SET_USER_TOKEN | INIT_REGIONS
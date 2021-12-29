import { Landfill, UserToken, Region, Driver } from '../../types'
import { ActionType } from '../action-types'



interface ADD_LANDFILL {
    type: ActionType.ADD_LANDFILL;
    data: Landfill
}

interface ADD_REGION {
    type:ActionType.ADD_REGION,
    data: Region
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

interface DELETE_REGION {
    type: ActionType.DELETE_REGION;
    data: Region
}

interface SET_USER_TOKEN {
    type: ActionType.SET_USER_TOKEN;
    data: (UserToken | null)
}


interface INIT_REGIONS {
    type:ActionType.INIT_REGIONS,
    data: Region[]
}


interface SET_REGION {
    type:ActionType.SET_REGION,
    data: Region
}

interface ADD_DRIVER {
    type:ActionType.ADD_DRIVER,
    data:Driver
}

interface UPDATE_DRIVER {
    type: ActionType.UPDATE_DRIVER,
    data:Driver
}

interface DELETE_DRIVER {
    type: ActionType.DELETE_DRIVER,
    data:Driver
}

interface INIT_DRIVERS {
    type: ActionType.INIT_DRIVERS,
    data:Driver[]
}


export type Action = ADD_LANDFILL | UPDATE_LANDFILL | INIT_LANDFILLS |
 DELETE_LANDFILL | SET_USER_TOKEN | INIT_REGIONS | SET_REGION | ADD_REGION | DELETE_REGION |
 ADD_DRIVER | UPDATE_DRIVER | DELETE_DRIVER | INIT_DRIVERS
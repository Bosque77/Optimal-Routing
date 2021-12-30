import { Landfill, UserToken, Region, Driver, Depot, Vehicle } from '../../types'
import { ActionType } from '../action-types'

interface SET_USER_TOKEN {
    type: ActionType.SET_USER_TOKEN;
    data: (UserToken | null)
}

interface SET_REGION {
    type:ActionType.SET_REGION,
    data: Region
}

interface ADD_LANDFILL {
    type: ActionType.ADD_LANDFILL;
    data: Landfill
}

interface ADD_REGION {
    type:ActionType.ADD_REGION,
    data: Region
}

interface ADD_DEPOT {
    type:ActionType.ADD_DEPOT;
    data: Depot
}

interface ADD_DRIVER {
    type:ActionType.ADD_DRIVER,
    data:Driver
}

interface ADD_VEHICLE {
    type: ActionType.ADD_VEHICLE;
    data: Vehicle
}

interface UPDATE_LANDFILL {
    type: ActionType.UPDATE_LANDFILL;
    data: Landfill
}

interface UPDATE_DRIVER {
    type: ActionType.UPDATE_DRIVER,
    data:Driver
}

interface UPDATE_DEPOT {
    type: ActionType.UPDATE_DEPOT;
    data: Depot
}

interface UPDATE_VEHICLE {
    type: ActionType.UPDATE_VEHICLE;
    data: Vehicle
}


interface DELETE_LANDFILL {
    type: ActionType.DELETE_LANDFILL;
    data: Landfill
}

interface DELETE_REGION {
    type: ActionType.DELETE_REGION;
    data: Region
}

interface DELETE_DRIVER {
    type: ActionType.DELETE_DRIVER,
    data:Driver
}

interface DELETE_DEPOT {
    type: ActionType.DELETE_DEPOT,
    data:Depot
}

interface DELETE_VEHICLE {
    type: ActionType.DELETE_VEHICLE,
    data:Vehicle
}


interface INIT_LANDFILLS {
    type: ActionType.INIT_LANDFILLS;
    data: Landfill[]
}

interface INIT_REGIONS {
    type:ActionType.INIT_REGIONS,
    data: Region[]
}

interface INIT_DRIVERS {
    type: ActionType.INIT_DRIVERS,
    data:Driver[]
}

interface INIT_DEPOTS {
    type: ActionType.INIT_DEPOTS,
    data: Depot[]
}

interface INIT_VEHICLES {
    type: ActionType.INIT_VEHICLES,
    data: Vehicle[]
}


export type Action = ADD_LANDFILL | UPDATE_LANDFILL | INIT_LANDFILLS |
 DELETE_LANDFILL | SET_USER_TOKEN | INIT_REGIONS | SET_REGION | ADD_REGION | DELETE_REGION |
 ADD_DRIVER | UPDATE_DRIVER | DELETE_DRIVER | INIT_DRIVERS | INIT_DEPOTS |
 ADD_DEPOT | UPDATE_DEPOT | INIT_DEPOTS | DELETE_DEPOT |
 ADD_VEHICLE | UPDATE_VEHICLE | DELETE_VEHICLE | INIT_VEHICLES
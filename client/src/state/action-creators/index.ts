import { ActionType } from '../action-types'
import { Action } from '../actions'
import landfillService from '../../services/landfills'
import loginService from '../../services/login'
import regionService from '../../services/regions'
import driverService from '../../services/driver'
import depotService from '../../services/depots'
import vehicleService from '../../services/vehicle'
import orderService from '../../services/order'
import { Dispatch } from 'redux'
import { Depot, Driver, EditVehicle, Landfill, LoginInfo, NewDepot, NewDriver, NewLandfill, NewOrder, NewRegion, NewVehicle, Order, Region, UserToken, Vehicle } from '../../types'

export const setRegion = (region: Region) => {
    window.localStorage.setItem('region', JSON.stringify(region))
    return {
        type: ActionType.SET_REGION,
        data: region
    }
}


export const initializeRegions = () => {
    return async (dispatch: Dispatch<Action>) => {
        const regions = await regionService.getAll()
        dispatch({
            type: ActionType.INIT_REGIONS,
            data: regions
        })
    }
}



export const initializeLandfills = (region:Region) => {
    return async (dispatch: Dispatch<Action>) => {
        const landfills = await landfillService.getByRegion(region)
        dispatch({
            type: ActionType.INIT_LANDFILLS,
            data: landfills
        })
    }
}


export const initializeDrivers = (region:Region) => {
    return async (dispatch: Dispatch<Action>) => {
        const drivers = await driverService.getByRegion(region)
        dispatch({
            type: ActionType.INIT_DRIVERS,
            data: drivers
        })
    }
}



export const initializeDepots = (region:Region) => {
    return async (dispatch: Dispatch<Action>) => {
        const depots = await depotService.getByRegion(region)
        dispatch({
            type: ActionType.INIT_DEPOTS,
            data: depots
        })
    }
}

export const initializeVehicles = (region:Region) => {
    return async (dispatch: Dispatch<Action>) => {
        const vehicles = await vehicleService.getByRegion(region)
        dispatch({
            type: ActionType.INIT_VEHICLES,
            data: vehicles
        })
    }
}

export const initializeOrders = (region:Region, date: string) => {
    return async (dispatch: Dispatch<Action>) => {
        const orders = await orderService.getByRegionAndDate(region, date)
        dispatch({
            type: ActionType.INIT_ORDERS,
            data: orders
        })
    }
}


export const createLandfill = (landfill: NewLandfill) => {
    return async (dispatch: Dispatch<Action>) => {
        const new_landfill = await landfillService.createNew(landfill)
        dispatch({
            type: ActionType.ADD_LANDFILL,
            data: new_landfill,
        })
    }
}

export const createDepot = (depot: NewDepot) => {
    return async (dispatch: Dispatch<Action>) => {
        const new_depot = await depotService.createNew(depot)
        dispatch({
            type: ActionType.ADD_DEPOT,
            data: new_depot,
        })
    }
}


export const createDriver = (driver: NewDriver) => {
    return async (dispatch: Dispatch<Action>) => {
        const new_driver = await driverService.createNew(driver)
        dispatch({
            type: ActionType.ADD_DRIVER,
            data: new_driver,
        })
    }
}

export const createVehicle = (vehicle: NewVehicle) => {
    return async (dispatch: Dispatch<Action>) => {
        const new_vehicle = await vehicleService.createNew(vehicle)
        dispatch({
            type: ActionType.ADD_VEHICLE,
            data: new_vehicle,
        })
    }
}

export const createOrder = (order: NewOrder) => {
    return async (dispatch: Dispatch<Action>) => {
        const new_order= await orderService.createNew(order)
        dispatch({
            type: ActionType.ADD_ORDER,
            data: new_order,
        })
    }
}

export const createRegion = (region:NewRegion) => {
    return async (dispatch: Dispatch<Action>) => {
        const new_region = await regionService.createNew(region)
        dispatch({
            type: ActionType.ADD_REGION,
            data: new_region,
        })
    }
}

export const updateLandfill = (updated_landfill: Landfill) => {

    return async (dispatch: Dispatch<Action>) => {
        const landfill = await landfillService.put(updated_landfill)
        dispatch({
            type: ActionType.UPDATE_LANDFILL,
            data: landfill
        })
    }
}


export const updateDriver = (updated_driver: Driver) => {

    return async (dispatch: Dispatch<Action>) => {
        const driver = await driverService.put(updated_driver)
        dispatch({
            type: ActionType.UPDATE_DRIVER,
            data: driver
        })
    }
}

export const updateVehicle = (updated_vehicle: EditVehicle) => {

    return async (dispatch: Dispatch<Action>) => {
        const vehicle = await vehicleService.put(updated_vehicle)
        console.log('returned vehicle')
        console.log(vehicle)
        dispatch({
            type: ActionType.UPDATE_VEHICLE,
            data: vehicle
        })
    }
}


export const updateDepot = (updated_depot: Depot) => {

    return async (dispatch: Dispatch<Action>) => {
        const depot = await depotService.put(updated_depot)
        dispatch({
            type: ActionType.UPDATE_DEPOT,
            data: depot
        })
    }
}

export const updateOrder = (updated_order: Order) => {

    return async (dispatch: Dispatch<Action>) => {
        const order = await orderService.put(updated_order)
        dispatch({
            type: ActionType.UPDATE_ORDER,
            data: order
        })
    }
}

export const deleteLandfill = (landfill: Landfill) => {
    return async (dispatch: Dispatch<Action>) => {
        await landfillService.deleteLandfill(landfill)  
        dispatch({
            type: ActionType.DELETE_LANDFILL,
            data: landfill
        })
    }
}

export const deleteDriver = (driver: Driver) => {
    return async (dispatch: Dispatch<Action>) => {
        await driverService.deleteDriver(driver)  
        dispatch({
            type: ActionType.DELETE_DRIVER,
            data: driver
        })
    }
}

export const deleteVehicle = (vehicle: Vehicle) => {
    return async (dispatch: Dispatch<Action>) => {
        await vehicleService.deleteVehicle(vehicle)  
        dispatch({
            type: ActionType.DELETE_VEHICLE,
            data: vehicle
        })
    }
}

export const deleteDepot = (depot: Depot) => {
    return async (dispatch: Dispatch<Action>) => {
        await depotService.deleteDepot(depot)  
        dispatch({
            type: ActionType.DELETE_DEPOT,
            data: depot
        })
    }
}

export const deleteRegion = (region:Region) => {
    return async (dispatch: Dispatch<Action>) => {
        await regionService.remove(region)  
        dispatch({
            type: ActionType.DELETE_REGION,
            data: region
        })
    }
}

export const deleteOrder = (order:Order) => {
    return async (dispatch: Dispatch<Action>) => {
        await orderService.deleteOrder(order)  
        dispatch({
            type: ActionType.DELETE_ORDER,
            data: order
        })
    }
}

export const loginUser = (login_info: LoginInfo) => {
    return async (dispatch: Dispatch<Action>) => {
        const user_data: UserToken = await loginService.login(login_info)
        window.localStorage.setItem('user_token', JSON.stringify(user_data))
        dispatch({
            type: ActionType.SET_USER_TOKEN,
            data: user_data
        })
    }
}


export const setUserToken = (user_token: UserToken | null) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_USER_TOKEN,
            data: user_token
        })
    }
}
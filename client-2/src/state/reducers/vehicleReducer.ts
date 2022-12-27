
import { Vehicle } from '../../types'
import { ActionType } from '../action-types'
import { Action } from '../actions'


const initialState: Vehicle[] = []


export const vehicleReducer = (state: Vehicle[] = initialState, action: Action): Vehicle[] => {
    switch (action.type) {
    case ActionType.ADD_VEHICLE:
        return [...state, action.data]
    case ActionType.UPDATE_VEHICLE: {
        const id = action.data.id
        const changed_vehicle = action.data
        return state.map(vehicle => vehicle.id !== id ? vehicle : changed_vehicle)
    }
    case ActionType.DELETE_VEHICLE: {
        const id = action.data.id
        return state.filter(driver => driver.id !== id)
    }
    case ActionType.INIT_VEHICLES:
        return action.data
    default:
        return state
    }
}


export default vehicleReducer



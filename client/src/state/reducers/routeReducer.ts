
import { TruckRoute } from '../../../../shared/types'
import { ActionType } from '../action-types'
import { Action } from '../actions'


const initialState: TruckRoute[] = []


export const routeReducer = (state: TruckRoute[] = initialState, action: Action): TruckRoute[] => {
    switch (action.type) {
    case ActionType.ADD_TRUCK_ROUTE:
        return [...state, action.data]
    case ActionType.UPDATE_TRUCK_ROUTE: {
        const id = action.data.id
        const changed_truck_route = action.data
        return state.map(truck_route => truck_route.id !== id ? truck_route : changed_truck_route)
    }
    case ActionType.DELETE_TRUCK_ROUTE: {
        const id = action.data.id
        return state.filter(landfill => landfill.id !== id)
    }
    case ActionType.INIT_TRUCK_ROUTES:
        return action.data
    default:
        return state
    }
}






export default routeReducer



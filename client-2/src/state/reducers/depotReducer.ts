
import { Depot } from '../../types'
import { ActionType } from '../action-types'
import { Action } from '../actions'


const initialState: Depot[] = []


export const depotReducer = (state: Depot[] = initialState, action: Action): Depot[] => {
    switch (action.type) {
    case ActionType.ADD_DEPOT:
        return [...state, action.data]
    case ActionType.UPDATE_DEPOT: {
        console.log('inside update landfill state')
        const id = action.data.id
        const changed_depot = action.data
        return state.map( depot=> depot.id !== id ? depot : changed_depot)
    }
    case ActionType.DELETE_DEPOT: {
        console.log('inside delete landfill state')
        const id = action.data.id
        return state.filter(driver => driver.id !== id)
    }
    case ActionType.INIT_DEPOTS:
        return action.data
    default:
        return state
    }
}


export default depotReducer



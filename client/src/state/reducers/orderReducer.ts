
import { Order } from '../../../../shared/types'
import { ActionType } from '../action-types'
import { Action } from '../actions'


const initialState: Order[] = []


export const orderReducer = (state: Order[] = initialState, action: Action): Order[] => {
    switch (action.type) {
    case ActionType.ADD_ORDER:
        return [...state, action.data]
    case ActionType.UPDATE_ORDER: {
        const id = action.data.id
        const changed_order = action.data
        return state.map(order => order.id !== id ? order : changed_order)
    }
    case ActionType.DELETE_ORDER: {
        const id = action.data.id
        return state.filter(driver => driver.id !== id)
    }
    case ActionType.INIT_ORDERS:
        return action.data
    default:
        return state
    }
}


export default orderReducer



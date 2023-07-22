
import { User } from '../../../../shared/types'
import { ActionType } from '../action-types'
import { Action } from '../actions'


const initialState: User | null = null


export const orderReducer = (state: User | null = initialState, action: Action): User | null => {
    switch (action.type) {
    case ActionType.UPDATE_USER: {
        return action.data
    }
    case ActionType.INIT_USER:
        return action.data
    default:
        return state
    }
}


export default orderReducer



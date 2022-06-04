
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { DriverToken } from '../../types'




const initialState = null

export const userTokenReducer = (state: DriverToken | null = initialState, action: Action): DriverToken | null => {
    switch (action.type) {
    case ActionType.SET_USER_TOKEN:
        return action.data
    default:
        return state
    }
}




export default userTokenReducer




import { ActionType } from '../action-types'
import { Action } from '../actions'
import { UserToken } from '../../types'




const initialState = null

export const userTokenReducer = (state: UserToken | null = initialState, action: Action): UserToken | null => {
    switch (action.type) {
    case ActionType.SET_USER_TOKEN:
        return action.data
    default:
        return state
    }
}




export default userTokenReducer



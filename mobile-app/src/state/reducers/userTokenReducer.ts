
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { UserToken } from '../../types'
import { AnyAction } from 'redux'



const initialState = null

export const userTokenReducer = (state: UserToken | null = initialState, action: AnyAction): UserToken | null => {
    switch (action.type) {
    case ActionType.SET_USER_TOKEN:
        return action.data
    default:
        return state
    }
}




export default userTokenReducer



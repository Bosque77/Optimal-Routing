
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { UserToken } from '../../types'


const initialState: UserToken = {
    token: 'no set token',
    username: 'test123'
}


export const userTokenReducer = (state: UserToken = initialState, action: Action): UserToken => {
    switch (action.type) {
    case ActionType.SET_USER_TOKEN:
        return action.data
    default:
        return state
    }
}




export default userTokenReducer



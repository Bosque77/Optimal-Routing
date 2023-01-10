import { ActionType } from '../action-types'
import { Action } from '../actions'
import { AlertState } from '../../types'

const initialState : AlertState = {
    message: '',
    severity: 'success',
    open: false,
}

const alertReducer = (state = initialState, action: Action): AlertState => {

    switch (action.type) {
    case ActionType.SET_ALERT:
        return action.data
    case ActionType.REMOVE_ALERT:
        return action.data
    default:
        return state
    }
}

export default alertReducer
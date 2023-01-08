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
        return state
    case ActionType.REMOVE_ALERT:
        return state
    default:
        return state
    }
}

export default alertReducer
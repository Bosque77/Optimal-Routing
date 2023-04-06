import { ActionType } from '../action-types'
import { Action } from '../actions'
import { AlertState } from '../../types'

const initialState : AlertState = {
    id: 0,
    message: '',
    severity: 'success',
    time: 0,
}

const alertReducer = (state = initialState, action: Action): AlertState => {

    switch (action.type) {
    case ActionType.SET_ALERT:
        return action.data
    default:
        return state
    }
}

export default alertReducer
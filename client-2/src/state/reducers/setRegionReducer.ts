
import { Region } from '../../types'
import { ActionType } from '../action-types'
import { Action } from '../actions'


const initialState: Region | null = null


export const setRegionReducer = (state:Region | null = initialState, action: Action): Region | null => {
    switch (action.type) {
    case ActionType.SET_REGION:
        return action.data
    default:
        return state
    }
}






export default setRegionReducer



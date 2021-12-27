
import { Region } from '../../types'
import { ActionType } from '../action-types'
import { Action } from '../actions'


const initialState: Array<Region> | null = null


export const regionReducer = (state:Region[] | null = initialState, action: Action): Region[]| null => {
    switch (action.type) {
    case ActionType.INIT_REGIONS:
        return action.data
    default:
        return state
    }
}






export default regionReducer




import { Region } from '../../types'
import { ActionType } from '../action-types'
import { Action } from '../actions'


const initialState: Array<Region> = []


export const regionReducer = (state: Region[] = initialState, action: Action): Region[] => {
    switch (action.type) {
    case ActionType.ADD_REGION:
        return [...state, action.data]
    case ActionType.DELETE_REGION:
    {
        const id = action.data.id
        return state.filter(region => region.id !== id)
    }
    case ActionType.INIT_REGIONS:
        return action.data

    default:
        return state
    }
}






export default regionReducer



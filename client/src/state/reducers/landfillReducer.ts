
import { Landfill } from '../../types'
import { ActionType } from '../action-types'
import { Action } from '../actions'


const initialState: Landfill[] = []


export const landfillReducer = (state: Landfill[] = initialState, action: Action): Landfill[] => {
    switch (action.type) {
    case ActionType.ADD_LANDFILL:
        return [...state, action.data]
    case ActionType.UPDATE_LANDFILL: {
        console.log('inside update landfill state')
        const id = action.data.id
        const changed_landfill = action.data
        debugger
        return state.map(landfill => landfill.id !== id ? landfill : changed_landfill)
    }
    case ActionType.DELETE_LANDFILL: {
        console.log('inside delete landfill state')
        const id = action.data.id
        return state.filter(landfill => landfill.id !== id)
    }
    case ActionType.INIT_LANDFILLS:
        return action.data
    default:
        return state
    }
}






export default landfillReducer



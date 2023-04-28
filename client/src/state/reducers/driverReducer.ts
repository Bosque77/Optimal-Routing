
import { Driver } from '../../../../shared/types'
import { ActionType } from '../action-types'
import { Action } from '../actions'


const initialState: Driver[] = []


export const driverReducer = (state: Driver[] = initialState, action: Action): Driver[] => {
    switch (action.type) {
    case ActionType.ADD_DRIVER:
        return [...state, action.data]
    case ActionType.UPDATE_DRIVER: {
        console.log('inside update landfill state')
        const id = action.data.id
        const changed_driver = action.data
        return state.map(driver => driver.id !== id ? driver : changed_driver)
    }
    case ActionType.DELETE_DRIVER: {
        console.log('inside delete landfill state')
        const id = action.data.id
        return state.filter(driver => driver.id !== id)
    }
    case ActionType.INIT_DRIVERS:
        return action.data
    default:
        return state
    }
}


export default driverReducer



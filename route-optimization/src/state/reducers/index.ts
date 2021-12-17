import { combineReducers } from 'redux'
import landfillReducer from './landfillReducer'

const reducers = combineReducers({
    landfills: landfillReducer
})

export default reducers

export type State = ReturnType<typeof reducers>
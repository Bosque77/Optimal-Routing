import { combineReducers } from 'redux'
import landfillReducer from './landfillReducer'
import userTokenReducer from './userTokenReducer'

const reducers = combineReducers({
    landfills: landfillReducer,
    usertoken: userTokenReducer
})

export default reducers

export type State = ReturnType<typeof reducers>
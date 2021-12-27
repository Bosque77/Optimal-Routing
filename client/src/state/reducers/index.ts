import { combineReducers } from 'redux'
import landfillReducer from './landfillReducer'
import userTokenReducer from './userTokenReducer'
import regionReducer from './regionReducer'
import setRegionReducer from './setRegionReducer'

const reducers = combineReducers({
    landfills: landfillReducer,
    userToken: userTokenReducer,
    regions: regionReducer,
    setRegion: setRegionReducer,
})

export default reducers

export type State = ReturnType<typeof reducers>
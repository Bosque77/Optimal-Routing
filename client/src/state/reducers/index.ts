import { combineReducers } from 'redux'
import landfillReducer from './landfillReducer'
import userTokenReducer from './userTokenReducer'
import regionReducer from './regionReducer'
import setRegionReducer from './setRegionReducer'
import driverReducer from './driverReducer'
import depotReducer from './depotReducer'

const reducers = combineReducers({
    landfills: landfillReducer,
    userToken: userTokenReducer,
    regions: regionReducer,
    setRegion: setRegionReducer,
    drivers: driverReducer,
    depots: depotReducer
})

export default reducers

export type State = ReturnType<typeof reducers>
import { combineReducers } from 'redux'
import landfillReducer from './landfillReducer'
import userTokenReducer from './userTokenReducer'
import regionReducer from './regionReducer'
import setRegionReducer from './setRegionReducer'
import driverReducer from './driverReducer'
import depotReducer from './depotReducer'
import vehicleReducer from './vehicleReducer'

const reducers = combineReducers({
    landfills: landfillReducer,
    userToken: userTokenReducer,
    regions: regionReducer,
    setRegion: setRegionReducer,
    drivers: driverReducer,
    depots: depotReducer,
    vehicles: vehicleReducer
})

export default reducers

export type State = ReturnType<typeof reducers>
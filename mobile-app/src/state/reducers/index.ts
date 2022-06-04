import { combineReducers } from 'redux'
import {userTokenReducer} from './userTokenReducer'


const reducers = combineReducers({
    userTokenReducer,

})

export default reducers

export type State = ReturnType<typeof reducers>
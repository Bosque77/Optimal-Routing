import { createStore, applyMiddleware, compose } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import reducers from './reducers/index'
// import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(
    reducers,
    // compose(  applyMiddleware(thunk),   composeWithDevTools())
    // compose(  applyMiddleware(thunk))
)
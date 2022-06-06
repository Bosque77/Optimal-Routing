import { createStore, applyMiddleware, compose, AnyAction } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import reducers, { State } from './reducers/index'
// import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(
    reducers,
    // compose(  applyMiddleware(thunk),   composeWithDevTools())
    compose(  applyMiddleware(thunk))
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch 
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
> 
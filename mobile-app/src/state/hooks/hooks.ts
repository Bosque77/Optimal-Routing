import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'
import type { RootState, AppDispatch, AppThunk } from '../store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
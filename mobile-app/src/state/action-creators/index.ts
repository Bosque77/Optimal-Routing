import loginService from '../../services/login'
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { AnyAction, Dispatch } from 'redux'
import { UserToken, LoginInfo } from '../../types'
import { setToken } from '../../services/config'
import { RootState, AppThunk } from '../store'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { State } from '..'



export const loginUser =
    (login_info: LoginInfo) => async (dispatch:Dispatch<Action>) => {
            const user_data: UserToken = await loginService.login(login_info)
            window.localStorage.setItem('user_token', JSON.stringify(user_data))
            console.log('looging window info')
            console.log('user_data.token')
            setToken(user_data.token)
            dispatch({
                type: ActionType.SET_USER_TOKEN,
                data: user_data
            })
        }
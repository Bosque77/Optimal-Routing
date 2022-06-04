import loginService from '../../services/login'
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Dispatch } from 'redux'
import { DriverToken, LoginInfo } from '../../types'
import { setToken } from '../../services/config'

export const loginUser = (login_info: LoginInfo) => {
    return async (dispatch: Dispatch<Action>) => {
        const user_data: DriverToken = await loginService.login(login_info)
        window.localStorage.setItem('user_token', JSON.stringify(user_data))
        setToken(user_data.token)
        dispatch({
            type: ActionType.SET_USER_TOKEN,
            data: user_data
        })
    }
}
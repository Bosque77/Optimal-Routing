import loginService from '../../services/login'
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { AnyAction, Dispatch } from 'redux'
import { UserToken, LoginInfo, LoginResponse, ServerResponse } from '../../types'
import { setToken } from '../../services/config'
import { RootState, AppThunk } from '../store'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { State } from '..'



export const loginUser =
    (login_info: LoginInfo) => async (dispatch:Dispatch<Action>) => {

        try{
            const login_response: LoginResponse = await loginService.login(login_info)
            if(login_response.status == 'SUCCESS'){

                const user_token = login_response.payload as UserToken
                setToken(user_token.token)
                window.localStorage.setItem('user_token', JSON.stringify(user_token))
            
                dispatch({
                    type: ActionType.SET_USER_TOKEN,
                    data: user_token
                })
            }
        } catch(error){
            throw error
        }

        }
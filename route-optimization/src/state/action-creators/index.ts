import { ActionType } from '../action-types'
import { Action } from '../actions'
import landfillService from '../../services/landfills'
import { Dispatch } from 'redux'
import { Landfill, NewLandfill } from '../../types'





export const initializeLandfills = () => {
    return async (dispatch: Dispatch<Action>)  => {
        const landfills = await landfillService.getAll()
        dispatch({
            type: ActionType.INIT_LANDFILLS,
            data: landfills
        })
    }
}


export const createLandfill = (landfill:NewLandfill) => {
    return async (dispatch: Dispatch<Action>) => {
        const new_landfill = await landfillService.createNew(landfill)
        dispatch({
            type: ActionType.ADD_LANDFILL,
            data: new_landfill,
        })
    }
}

export const updateLandfill = (updated_landfill:Landfill) => {

    return async (dispatch: Dispatch<Action>)  => {
        const landfill = await landfillService.put(updated_landfill)
        dispatch({
            type: ActionType.UPDATE_LANDFILL,
            data: landfill
        })
    }
}

export const deleteLandfill = (landfill:Landfill) => {
    return async (dispatch: Dispatch<Action>) => {
        await landfillService.deleteLandfill(landfill)  // Need to implement some type of error handling here
        dispatch({
            type: ActionType.DELETE_LANDFILL,
            data: landfill
        })
    }
}
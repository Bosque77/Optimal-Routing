import { ActionType } from '../action-types'
import { Action } from '../actions'
import landfillService from '../../services/landfills'
import { Dispatch } from 'redux'
import { Landfill } from '../../types'





export const initializeLandfills = () => {
    return async (dispatch: Dispatch<Action>)  => {
        const landfills = await landfillService.getAll()
        dispatch({
            type: ActionType.INIT_LANDFILLS,
            data: landfills
        })
    }
}


// export const createNote = (content:NewLandfill): Promise<void> => {
//     return async dispatch => {
//         const new_landfill = await landfillService.createNew(content)
//         dispatch({
//             type: 'NEW_LANDFILL',
//             data: new_landfill,
//         })
//     }
// }

export const updateLandfill = (updated_landfill:Landfill) => {

    return async (dispatch: Dispatch<Action>)  => {
        const landfill = await landfillService.put(updated_landfill)
        console.log('about to dispatch the action ')
        dispatch({
            type: ActionType.UPDATE_LANDFILL,
            data: landfill
        })
    }
}

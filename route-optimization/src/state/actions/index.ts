import { Landfill } from '../../types'
import { ActionType } from '../action-types'



interface ADD_LANDFILL {
    type: ActionType.ADD_LANDFILL;
    data: Landfill
}

interface UPDATE_LANDFILL {
    type: ActionType.UPDATE_LANDFILL;
    data: Landfill
}

interface INIT_LANDFILLS {
    type: ActionType.INIT_LANDFILLS;
    data: Landfill[]
}


export type Action = ADD_LANDFILL | UPDATE_LANDFILL | INIT_LANDFILLS
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { AlertState } from "../../../../shared/types";
import { isVisible } from "@testing-library/user-event/dist/utils";

const initialState: AlertState = {
  message: "",
  severity: "success",
  isVisible: false,
};

const alertReducer = (state = initialState, action: Action): AlertState => {
  switch (action.type) {
    case ActionType.SHOW_ALERT:
      return action.data
    case ActionType.HIDE_ALERT:
      return action.data
    default:
      return state;
  }
};

export default alertReducer;

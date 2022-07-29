import { createAction } from "../../utils/helpers/reducer.utils";
import { USER_ACTION_TYPE } from "./user.types";

export const setUser = (user) => createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user);
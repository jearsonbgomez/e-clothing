import { createAction } from "../../utils/helpers/reducer.utils"
import { CATEGORY_TYPES } from "./categories.types";

export const setCategories = categories => createAction(CATEGORY_TYPES.SET_CATEGORIES, categories);

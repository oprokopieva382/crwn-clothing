import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPE } from "./category.types";

export const fetchCategoryStart = () =>
  createAction(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_START);
export const fetchCategorySuccess = (categoriesArray) =>
  createAction(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categoriesArray);
export const fetchCategoryFailed = (error) =>
  createAction(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error);
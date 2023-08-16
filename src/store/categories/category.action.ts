import {
  createAction,
  ActionWithPayload,
  Action,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPE, Category } from "./category.types";

export type FetchCategoryStart =
  Action<CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_START>;
export type FetchCategorySuccess = ActionWithPayload<
  CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;
export type FetchCategoryFailed = ActionWithPayload<
  CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_FAILED,
  Error
>;

export const fetchCategoryStart = withMatcher((): FetchCategoryStart =>
  createAction(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_START));

export const fetchCategorySuccess = withMatcher((
  categoriesArray: Category[]
): FetchCategorySuccess =>
  createAction(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categoriesArray));

export const fetchCategoryFailed = withMatcher((error: Error): FetchCategoryFailed =>
  createAction(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error));
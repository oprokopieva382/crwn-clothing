import { Category } from "./category.types";
import {
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailed,
} from "./category.action";
import { AnyAction } from "redux";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoryReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
) => {
  if (fetchCategoryStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (fetchCategorySuccess.match(action)) {
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
    };
  }
  if (fetchCategoryFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }
  return state;
};
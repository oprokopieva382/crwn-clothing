import { CATEGORY_ACTION_TYPE, Category } from "./category.types";
import { CategoryType } from "./category.action";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoryReducer = (
  state: CategoriesState = INITIAL_STATE,
  action = {} as CategoryType
) => {
  switch (action.type) {
    case CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
      };
    case CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

import { combineReducers } from "redux";
import { userReducer } from "./userReducer/userReducer";
import { cartReducer } from './cartReducer/cartReducer';
import { categoryReducer } from "./categories/categoryReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  categories: categoryReducer,
});
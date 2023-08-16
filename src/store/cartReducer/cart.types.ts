import { CategoryItem } from "../categories/category.types"

export enum CART_ACTION_TYPE {
  SET_IS_CAR_OPEN = "SET_IS_CAR_OPEN",
  SET_CART_ITEMS = "SET_CART_ITEMS",
  SET_CART_COUNT = "SET_CART_COUNT",
  SET_CART_TOTAL = "SET_CART_TOTAL",
};

export type CartItem = CategoryItem & {
  quantity: number
};
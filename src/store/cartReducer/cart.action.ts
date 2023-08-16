import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPE, CartItem } from "./cart.types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingCart = cartItems.find((item) => item.id === productToAdd.id);

  if (existingCart) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CategoryItem
): CartItem[] => {
  const existingCart = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );
  if (existingCart && existingCart.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  return cartItems.map((item) =>
    item.id === cartItemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
const clearCartItem = (
  cartItems: CartItem[],
  cartItemToClear: CategoryItem
): CartItem[] => cartItems.filter((item) => item.id !== cartItemToClear.id);

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPE.SET_IS_CAR_OPEN,
  boolean
>;
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPE.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher((value: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPE.SET_IS_CAR_OPEN, value);
});

export const setCartItem = withMatcher(
  (cartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems);
  }
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItem(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItem(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return setCartItem(newCartItems);
};

import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPE } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCart = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );
  if (existingCart.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  return cartItems.map((item) =>
    item.id === cartItemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((item) => item.id !== cartItemToClear.id);

export const setIsCartOpen = (value) => {
  return createAction(CART_ACTION_TYPE.SET_IS_CAR_OPEN, value);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

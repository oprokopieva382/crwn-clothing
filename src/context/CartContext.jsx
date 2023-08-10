import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPE = {
  SET_IS_CAR_OPEN: "SET_IS_CAR_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPE.SET_IS_CAR_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [{ cartCount, cartTotal, cartItems, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItem) => {
    const newCartCount = newCartItem.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItem.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPE.SET_CART_ITEMS, {
        cartItems: newCartItem,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };
  const setIsCartOpen = (value) => {
    dispatch(createAction(CART_ACTION_TYPE.SET_IS_CAR_OPEN, value));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItem = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItem,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

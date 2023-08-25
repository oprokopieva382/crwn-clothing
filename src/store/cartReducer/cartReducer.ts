import { AnyAction } from "redux";
import { CartItem } from "./cart.types";
import { setIsCartOpen, setCartItem } from "./cart.action";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }
  if (setCartItem.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }
  return state;
};

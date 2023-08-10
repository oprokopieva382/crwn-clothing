const CART_ACTION_TYPE = {
  SET_IS_CAR_OPEN: "SET_IS_CAR_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
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
      return state;
  }
};

import { setCartItem, setIsCartOpen } from "../cart.action";
import { CART_INITIAL_STATE, cartReducer } from "../cartReducer";

describe("CartReducer tests", () => {
  test("setIsCartOpen test", () => {
    const mockValue = true;
    const expectedState = {
      ...CART_INITIAL_STATE,
      isCartOpen: true,
    };

    expect(cartReducer(CART_INITIAL_STATE, setIsCartOpen(mockValue))).toEqual(
      expectedState
    );
  });

  test("setCartItem test", () => {
    const mockData = {
      cartItems: [
        { id: 1, imageUrl: "test", name: "item 1", price: 10, quantity: 3 }
      ],
    };
    const expectedState = {
      ...CART_INITIAL_STATE,
      cartItems: mockData,
    };

    expect(cartReducer(CART_INITIAL_STATE, setCartItem(mockData))).toEqual(
      expectedState
    );
  });
});

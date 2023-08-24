import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import { CartIcon } from "../CartIcon.component";

describe("Cart Icon test", () => {
  test("Uses preloaded state to render", () => {
    const initialCartItems = [
      { id: 1, name: "Name A", imageUrl: "test", price: 10, quantity: 1 },
      { id: 2, name: "Name B", imageUrl: "test", price: 11, quantity: 3 },
    ];
    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: { cartItems: initialCartItems },
      },
    });

    const cartIconElement = screen.getByText("4")
    expect(cartIconElement).toBeInTheDocument()
  });
});

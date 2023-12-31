import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import Navigation from "../Navigation.component";
import * as rr from "react-redux";
import { signOutStart } from "../../../store/userReducer/user.action";

describe("Navigation test", () => {
  test("It should render a Sign In link and not Sign Out if there is no currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    });

    const signOutLinkElement = screen.queryByText(/sign out/i);
    expect(signOutLinkElement).toBeNull();

    const signInLinkElement = screen.getByText(/sign in/i);
    expect(signInLinkElement).toBeInTheDocument();
  });

  test("It should render a Sign Out link and not Sign In if there is a currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    const signInLinkElement = screen.queryByText(/sign in/i);
    expect(signInLinkElement).toBeNull();

    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();
  });

  test("it should render a cart dropdown if isCartOpen is true", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    });
    const dropdownTextElement = screen.getByText(/your cart is empty/i);
    expect(dropdownTextElement).toBeInTheDocument();
  });

  test("it should not render a cart dropdown if isCartOpen is false", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: [],
        },
      },
    });
    const dropdownTextElement = screen.queryByText(/your cart is empty/i);
    expect(dropdownTextElement).toBeNull();
  });

//   test("it should dispatch signOutState action when clicking on the Sign Out link", async () => {
//     const mockDispatch = jest.fn();
//     console.log(rr);
//     jest.spyOn(rr, "useDispatch").mockReturnValue(mockDispatch);

//     renderWithProviders(<Navigation />, {
//       preloadedState: {
//         user: {
//           currentUser: {},
//         },
//       },
//     });
//     const signOutLinkElement = screen.getByText(/sign out/i);
//     console.log(signOutLinkElement);
//     expect(signOutLinkElement).toBeInTheDocument();

//     await fireEvent.click(signOutLinkElement);
//     expect(mockDispatch).toHaveBeenCalled();
//     expect(mockDispatch).toHaveBeenCalledWith(signOutStart());

//     mockDispatch.mockClear();
//   });
});

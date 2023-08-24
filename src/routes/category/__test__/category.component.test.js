import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import { Category } from "../Category";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    category: "mens",
  }),
}));

describe("Category test", () => {
  test("It should render a Spinner if isLoading is true", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categories: [],
        },
      },
    });

    const spinnerElement = screen.getByTestId("spinner")
    expect(spinnerElement).toBeInTheDocument()
  });

  test("It should not render a Spinner but render products if isLoading is false", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
                title: "mens",
                items: [
                    {id: 1, name: "product 1"},
                    {id: 2, name: "product 2"}
                ]
            }
          ],
        },
      },
    });

    const spinnerElement = screen.queryByTestId("spinner");
    expect(spinnerElement).toBeNull();

     const product1Element = screen.getByText(/product 1/i);
     expect(product1Element).toBeInTheDocument();
  });
});

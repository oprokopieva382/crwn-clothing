import { fireEvent, screen } from "@testing-library/react"
import { renderWithProviders } from "../../../utils/test/test.utils"
import { ProductCard } from "../ProductCard.component"

describe("Product Card test", ()=> {
    test("it should add the product item when Product Card button is clicked", async ()=> {
        const mockProduct = {
            id: 1,
            imageUrl: "test",
            name: "Item A",
            price: 11 
        }
        const {store} = renderWithProviders(<ProductCard product={mockProduct}/>, {
            preloadedState: {
                cart: {
                    cartItems: []
                }
            }
        })

        const addToCartButtonElement = screen.getByText(/add to card/i)
        await fireEvent.click(addToCartButtonElement)
        expect(store.getState().cart.cartItems.length).toBe(1)
    })
})
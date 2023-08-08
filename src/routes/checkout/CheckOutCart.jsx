import { useContext } from "react";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import { CartContext } from "../../context/CartContext";
import { CheckOutCartItem } from "../../components/check-out-cart/CheckOutCartItem.component";

export const CheckOutCart = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.length ? (
        cartItems.map((item) => (
          <CheckOutCartItem key={item.id} cartItem={item} />
        ))
      ) : (
        <div>Your cart is empty</div>
      )}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

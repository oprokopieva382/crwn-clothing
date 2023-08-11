import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import { CheckOutCartItem } from "../../components/check-out-cart/CheckOutCartItem.component";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cartReducer/cart.selector";

export const CheckOutCart = () => {
  const cartTotal = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);
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

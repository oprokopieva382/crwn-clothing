import { useSelector } from "react-redux";
import { Button } from "../button/Button.component";
import { CartItem } from "../cart-item/CartItem.component";
import {
  CartDropDownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";
import { useNavigate } from "react-router-dom";
import { selectCartItems } from "../../store/cartReducer/cart.selector";

export const CartDropDown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>CHECK OUT</Button>
    </CartDropDownContainer>
  );
};

import { CartContext } from "../../context/CartContext";
import { Button } from "../button/Button.component";
import { CartItem } from "../cart-item/CartItem.component";
import "./cart-dropdown.styles.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

const goToCheckoutHandler = ()=> {
    navigate("/checkout");
}

  return (
    <div className="cart-dropdown-container">
      <div className="cart-item">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={goToCheckoutHandler}>CHECK OUT</Button>
    </div>
  );
};

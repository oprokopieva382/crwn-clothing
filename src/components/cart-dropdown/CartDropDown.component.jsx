import { CartContext } from "../../context/CartContext";
import { Button } from "../button/Button.component";
import { CartItem } from "../cart-item/CartItem.component";
import "./cart-dropdown.styles.scss";
import { useContext } from "react";

export const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-item">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span>Your cart is empty</span>
        )}
      </div>
      <Button>CHECK OUT</Button>
    </div>
  );
};

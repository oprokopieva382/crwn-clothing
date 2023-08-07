import { useContext } from "react";
import "./checkout.styles.scss"
import { CartContext } from "../../context/CartContext";
import { CheckOutCartItem } from "../../components/check-out-cart/CheckOutCartItem.component";

export const CheckOutCart = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      <hr />
      {cartItems.length ? (
        cartItems.map((item) => (
          <CheckOutCartItem key={item.id} cartItem={item} />
        ))
      ) : (
        <div>Your cart is empty</div>
      )}
      <hr />
      <span className="total">Total: ${cartTotal}</span>
    </div>
  );
};

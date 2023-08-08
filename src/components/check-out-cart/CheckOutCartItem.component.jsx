import { useContext } from "react";
import "./checkout-cart-item.styles.scss";
import { CartContext } from "../../context/CartContext";

export const CheckOutCartItem = ({ cartItem }) => {
  const { price, name, quantity, imageUrl } = cartItem;
  const { addItemToCart, clearItemFromCart, removeItem } =
    useContext(CartContext);

  const addItemToCartHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItem(cartItem);
  const clearItemFromCartHandler = () => clearItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>

      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemFromCartHandler}>
        &#10005;
      </div>
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { selectIsCartOpen, selectCartCount } from "../../store/cartReducer/cart.selector";
import { CartIconContainer,  ItemCount } from "./cart-icon.styles";
import { setIsCartOpen } from "../../store/cartReducer/cart.action"
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

export const CartIcon = () => {
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch()

  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

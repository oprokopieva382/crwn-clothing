import { useDispatch, useSelector } from "react-redux";
import { Button, BUTTON_TYPE_CLASSES } from "../button/Button.component";
import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";
import { addItemToCart } from "../../store/cartReducer/cart.action";
import { selectCartItems } from "../../store/cartReducer/cart.selector";

export const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems)

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
  SignOutNavLink,
} from "./navigation.styles";
import { CartIcon } from "../../components/cart-icon/CartIcon.component";
import { CartDropDown } from "../../components/cart-dropdown/CartDropDown.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/userReducer/user.selector";
import { selectIsCartOpen } from "../../store/cartReducer/cart.selector";
import { signOutStart } from "../../store/userReducer/user.action";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch()

  const signOutHandler = () => dispatch(signOutStart())

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <SignOutNavLink onClick={signOutHandler}>
              SIGN OUT
            </SignOutNavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
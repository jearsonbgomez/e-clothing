import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../contexts/cart.context";
import { selectUser } from '../../store/user/user.selector';
import { signOutUser
 } from "../../utils/firebase/firebase.utils";
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from "./navigation.styles";

const Navigation = () => {
  
  const user = useSelector(selectUser);

  const { isOpen } = useContext(CartContext);

  const handleSignOut= async () => {
    await signOutUser();

  }
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">
            Shop
          </NavLink>
          { user ? <NavLink onClick={ handleSignOut } as="span">Sign Out</NavLink>: 
            <NavLink to="/authentication">          
              Sign In
            </NavLink>
          }
          <CartIcon />
        </NavLinks>
        {
          isOpen && <CartDropdown />
        }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser
 } from "../../utils/firebase/firebase.utils";
import "./navigation.styles.scss";

const Navigation = () => {
  const { user } = useContext(UserContext);

  const handleSignOut= async () => {
    await signOutUser();

  }
  return (
    <Fragment>
      <nav className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          { user ? <span onClick={ handleSignOut } className="nav-link">Sign Out</span>: 
            <Link className="nav-link" to="/authentication">          
              Sign In
            </Link>
          }
        </div>
      </nav>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
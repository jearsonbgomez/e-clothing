import { useContext } from 'react';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';
import './cart-dropdown.styles.scss';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const onChangeHandler = () => {
    navigate('/checkout');
  }
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        { cartItems.map(item => <CartItem cartItem={item} key={item.id}/>) }
      </div>
      <Button onClick={onChangeHandler}>Checkout</Button>
    </div>
  )
}

export default CartDropdown;
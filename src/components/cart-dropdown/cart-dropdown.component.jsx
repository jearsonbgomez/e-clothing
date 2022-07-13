import { useContext } from 'react';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const onChangeHandler = () => {
    navigate('/checkout');
  }
  return (
    <CartDropdownContainer>
      <CartItems>
        { cartItems.length ? 
          cartItems.map(item => <CartItem cartItem={item} key={item.id}/>) : 
          <EmptyMessage>You do not have any items on your cart.</EmptyMessage>
        }
      </CartItems>
      <Button onClick={onChangeHandler}>Checkout</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown;
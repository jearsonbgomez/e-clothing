import { useContext } from 'react';
import { CartIconContainer, ShoppingIconSvg, ItemCount } from './cart-icon.styles';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const {isOpen, setIsOpen, cartCount} = useContext(CartContext);

  const toggleCart = () => {
    setIsOpen(!isOpen)
  }

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIconSvg />
      <ItemCount>{ cartCount }</ItemCount>
    </CartIconContainer>
  )
};

export default CartIcon;


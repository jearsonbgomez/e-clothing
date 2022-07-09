import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, itemToAdd) => {

  const item = cartItems.find(item => itemToAdd.id === item.id);

  if(item) {
    return cartItems.map(cartItem => cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
  }

  return [...cartItems, {...itemToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, itemToBeRemoved) => {

  const item = cartItems.find(cartItem => cartItem.id === itemToBeRemoved.id);

  if(item.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== item.id);
  }

  return cartItems.map(cartItem => cartItem.id === item.id ? 
    {...cartItem, quantity: cartItem.quantity - 1} : 
    cartItem
  );

}

const clearCartItem = (cartItems, itemsToBeCleared) => {

  return cartItems.filter(cartItem => cartItem.id !== itemsToBeCleared.id);
}

export const CartContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (itemToAdd) => {
    setCartItems(addCartItem(cartItems, itemToAdd));
  }

  const removeItemFromCart= (itemToBeRemoved) => {
    setCartItems(removeCartItem(cartItems, itemToBeRemoved));
  }

  const clearItemFromCart = (itemToBeCleared) => {
    setCartItems(clearCartItem(cartItems, itemToBeCleared));
  }

  useEffect(() => {
    setCartCount(cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setCartTotal(cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0))
  }, [cartItems]);


  const value = {
    isOpen, 
    setIsOpen, 
    cartItems, 
    cartCount, 
    cartTotal,
    addItemToCart, 
    removeItemFromCart,
    clearItemFromCart
  };

  return <CartContext.Provider value={value}>{ children }</CartContext.Provider>
};
import { createContext, useReducer } from "react";
import { createAction } from "../utils/helpers/reducer.utils";

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

const CART_ACTION_TYPE = {
  SET_CART_ITEMS_INFO: 'SET_CART_ITEMS_INFO',
  SET_IS_OPEN: 'SET_IS_OPEN'
};

const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isOpen: false
}

const cartReducer = (state, action) => {

  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS_INFO: 
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPE.SET_IS_OPEN:
      return {
        ...state,
        isOpen: payload
      }
    default: 
      throw new Error(`Unhandled type ${ type }`);
  }
}


export const CartProvider = ({ children }) => {

  const [ { cartItems, cartCount, cartTotal, isOpen }, dispatch ] = useReducer(cartReducer, INITIAL_STATE)

  const setIsOpen = (isOpen) => dispatch(createAction(CART_ACTION_TYPE.SET_IS_OPEN, isOpen)) ;
  
  const updateCartReducer = (newCartItem) => {

    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

    dispatch(createAction(
      CART_ACTION_TYPE.SET_CART_ITEMS_INFO, 
      {
        cartItems: newCartItem,
        cartTotal: newCartTotal,
        cartCount: newCartCount
      })
    );
  }

  const addItemToCart = (itemToAdd) => {
    updateCartReducer(addCartItem(cartItems, itemToAdd));
  }

  const removeItemFromCart= (itemToBeRemoved) => {
    updateCartReducer(removeCartItem(cartItems, itemToBeRemoved));
  }

  const clearItemFromCart = (itemToBeCleared) => {
    updateCartReducer(clearCartItem(cartItems, itemToBeCleared));
  }

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
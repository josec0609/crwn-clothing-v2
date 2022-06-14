import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
});

const addCartItem = (cartItems, itemToAdd) => {
  const newCartItems = [...cartItems];
  const itemIndexInCart = newCartItems.findIndex((item) => item.id === itemToAdd.id);

  if (itemIndexInCart !== -1) {
    newCartItems[itemIndexInCart].quantity += 1;
  } else {
    newCartItems.push({ ...itemToAdd, quantity: 1 });
  }
  return newCartItems;
};

const removeCartItem = (cartItems, itemToRemove) => {
  if (!itemToRemove) return;

  const newCartItems = [...cartItems];
  const itemIndexInCart = newCartItems.findIndex((item) => item.id === itemToRemove.id);

  if (itemIndexInCart !== -1 && newCartItems[itemIndexInCart].quantity > 1) {
    newCartItems[itemIndexInCart].quantity -= 1;
  } else {
    newCartItems.splice(itemIndexInCart, 1);
  }

  return newCartItems;
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (newItem) => {
    if (!newItem) return;

    setCartItems(addCartItem(cartItems, newItem));
  };

  const removeItemFromCart = (newItem) => {
    if (!newItem) return;

    setCartItems(removeCartItem(cartItems, newItem));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartCount,
    addItemToCart,
    removeItemFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

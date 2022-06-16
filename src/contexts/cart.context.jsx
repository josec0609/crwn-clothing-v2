import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
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

const clearCartItem = (cartItems, itemToClear) =>
  cartItems.filter((item) => item.id !== itemToClear.id);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (itemToAdd) => {
    if (!itemToAdd) return;

    setCartItems(addCartItem(cartItems, itemToAdd));
  };

  const removeItemFromCart = (itemToRemove) => {
    if (!itemToRemove) return;

    setCartItems(removeCartItem(cartItems, itemToRemove));
  };

  const clearItemFromCart = (itemToClear) => {
    if (!itemToClear) return;

    setCartItems(clearCartItem(cartItems, itemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

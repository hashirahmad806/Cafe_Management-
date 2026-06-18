import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('brew_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('brew_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i._id !== id));

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev.map(i => i._id === id ? { ...i, quantity: i.quantity + delta } : i)
          .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
  const cartTotal = cart.reduce((t, i) => t + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

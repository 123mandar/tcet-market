import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context
const CartContext = createContext();

// Cart Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Retrieve the cart from localStorage (this happens on initial load)
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Add item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      return updatedCart;
    });
  };

  // Remove item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Update quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item._id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      return updatedCart;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // Clear from localStorage as well
  };

  // Clear cart on logout (optional: can trigger when user logs out)
  const clearCartOnLogout = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // If cart is present in localStorage after login or refresh, update the state
  const restoreCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  // Call restoreCart on login or page load
  useEffect(() => {
    restoreCart();
  }, []); // Run once when the component is mounted

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        clearCartOnLogout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = () => useContext(CartContext);

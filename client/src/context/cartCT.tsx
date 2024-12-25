import React, { createContext, useState, ReactNode } from 'react';
import axios from 'axios';
import api from '../component/config/axios';

interface CartContextType {
  cart: any[];
  addToCart: (item: any) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  setCart: () => {}
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = async (item: any) => {
    try {
      const response = await axios.post(`${api}/api/cart/add`, item, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        }
      });
      if (response.status === 200) {
        setCart((prevCart) => [...prevCart, { ...item, cartItemId: response.data.cartItemId }]);
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const response = await axios.delete(`${api}/api/cart/remove/${cartItemId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        }
      });
      if (response.status === 200) {
        setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

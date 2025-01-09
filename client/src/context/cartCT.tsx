import React, { createContext, useState, ReactNode } from 'react';
import axios from 'axios';
import api from '../component/config/axios';
import { IRoomsDetail } from '../interface/room';

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

  const addToCart = async (data: { products: any[] }) => {
    try {
      for (const product of data.products) {
        const response = await axios.post(`${api}/api/booking/addbooking`, { product }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        if (response.status === 200) {
          setCart((prevCart) => [
            ...prevCart,
            { ...product, cartItemId: response.data.cartItemId },
          ]);
        }
      }
    } catch (error) {
      console.error('Failed to add items to cart:', error);
    }
  };
  

  const removeFromCart = async (roomIds: any) => {
    try {
      const response = await axios.post(
        `${api}/api/cart/remove`,
        { room_ids: roomIds }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
  
      if (response.status === 200) {
        setCart((prevCart) => prevCart.filter((item) => !roomIds.includes(item.detail_room_id)));
      }
    } catch (error) {
      console.error('Failed to remove items from cart:', error);
    }
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart,removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

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
      await Promise.all(
        data.products.map(async (product) => {
          await axios.post(`${api}/api/cart/add`, { product }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
        })
      );
      // Fetch updated cart
      const response = await api.get('/api/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (response.status === 200) {
        setCart(response.data.carts);
      }
    } catch (error) {
      console.error('Failed to add items to cart:', error);
    }
  };
  

  const removeFromCart = async (cartItemId:string) => {
    try {
      // Gửi yêu cầu xóa tới API
      await api.delete(`/api/cart/cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // Cập nhật trạng thái giỏ hàng
      setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      throw new Error("Không thể xóa sản phẩm khỏi giỏ hàng.");
    }
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart,removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

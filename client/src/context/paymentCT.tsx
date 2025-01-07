// PaymentContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface Room {
  id: number;
  name: string;
  dates: string;
  guests: string;
  price: number;
  image: string;
}

interface PaymentContextProps {
  bookedRooms: Room[];
  totalPrice: number;
  addRoom: (room: Room) => void;
  resetPayment: () => void;
}

export const PaymentContext = createContext<PaymentContextProps | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookedRooms, setBookedRooms] = useState<Room[]>([]);

  const addRoom = (room: Room) => {
    setBookedRooms((prevRooms) => [...prevRooms, room]);
  };
  const resetPayment = () => {
    setBookedRooms([]); };

  const totalPrice = bookedRooms.reduce((total, room) => total + room.price, 0);

  return (
    <PaymentContext.Provider value={{ bookedRooms, totalPrice, addRoom,resetPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

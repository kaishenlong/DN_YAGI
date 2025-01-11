// PaymentContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { IRoomsDetail, Room } from '../interface/room';


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

    const totalPrice = bookedRooms.reduce((total, room) => 
      { const [checkIn, checkOut] = room.dates.split(' - '); const checkInDate = new Date(checkIn); 
        const checkOutDate = new Date(checkOut);
         const numberOfDays = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24); 
      return total + (room.price * numberOfDays * room.quantity); }, 0);
  return (
    <PaymentContext.Provider value={{ bookedRooms, totalPrice, addRoom,resetPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

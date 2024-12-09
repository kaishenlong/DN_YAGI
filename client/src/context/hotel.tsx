import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IHotel } from "../interface/hotel";
import { getallHotels } from "../service/hotel";
import { getallRoom } from "../service/room";
type Props = {
  children: React.ReactNode;
};

export const hotelCT = createContext({} as any);

const HotelContext = ({ children }: Props) => {
  const [hotels, setHotel] = useState<IHotel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getallHotels();
      const rooms = await getallRoom();

      const combinedData = data.data.map((hotel: any) => {
        const room = rooms.data.find((r: any) => r.hotel_id === hotel.id);
        return {
          ...hotel,
          price: room?.price || "Chưa có giá",
          price_surcharge: room?.price_surcharge || "Không có khuyến mãi",
        };
      });

      setHotel(combinedData);
    };

    fetchData();
  }, []);

  return (
    <hotelCT.Provider
      value={{
        hotels,
      }}
    >
      {children}
    </hotelCT.Provider>
  );
};

export default HotelContext;

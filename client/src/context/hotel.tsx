import React, { createContext, useState, useEffect } from "react";
import { IHotel } from "../interface/hotel";
import { getallHotels } from "../service/hotel";
import { getallRoom } from "../service/room";
type Props = {
  children: React.ReactNode;
};
export const HotelContext = createContext({} as any);

const HotelProvider = ({ children }: { children: React.ReactNode }) => {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [favoriteHotels, setFavoriteHotels] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getallHotels();
      const rooms = await getallRoom();
      const combinedData = data.data.map((hotel: IHotel) => {
        const room = rooms.data.find((r: any) => r.hotel_id === hotel.id);
        return {
          ...hotel,
          price: room?.price || "Chưa có giá",
        };
      });
      setHotels(combinedData);
    };

    fetchData();

    // Lấy danh sách khách sạn yêu thích từ LocalStorage khi load trang
    const storedFavorites = localStorage.getItem("favoriteHotels");
    if (storedFavorites) {
      setFavoriteHotels(JSON.parse(storedFavorites));
    }
  }, []);

  // Hàm thêm khách sạn vào yêu thích
  const addToFavorites = (hotelId: number) => {
    setFavoriteHotels((prevFavorites) => [...prevFavorites, hotelId]);
    localStorage.setItem(
      "favoriteHotels",
      JSON.stringify([...favoriteHotels, hotelId])
    );
  };

  return (
    <HotelContext.Provider
      value={{
        hotels,
        favoriteHotels,
        setFavoriteHotels,
        addToFavorites,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelProvider;

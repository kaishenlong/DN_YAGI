import React, { createContext, useState, useEffect } from "react";
import { IHotel } from "../interface/hotel";
import { getallHotels } from "../service/hotel";
import { getallRoom } from "../service/room";
import { useParams } from "react-router-dom";
import { getallCitys } from "../service/city";
type Props = {
  children: React.ReactNode;
};
export const HotelContext = createContext({} as any);

const HotelProvider = ({ children }: { children: React.ReactNode }) => {
  const [hotelids, setHotels] = useState<IHotel[]>([]);
  const [favoriteHotels, setFavoriteHotels] = useState<number[]>([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getallHotels();
        const hotel = data.data.find(
          (hotel: IHotel) => hotel.id === Number(id)
        );
        if (hotel) {
          setHotels([hotel]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

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
        hotelids,
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

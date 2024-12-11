import React, { createContext, useState, useEffect, useContext } from "react";
import { IHotel } from "../interface/hotel";
import { getallHotels } from "../service/hotel";
import { getallRoom } from "../service/room";

interface HotelContextType {
  hotels: IHotel[];
  filter: any;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  hotelCount: number;
  setHotelCount: React.Dispatch<React.SetStateAction<number>>;
  favoriteHotels: number[]; // Danh sách các khách sạn yêu thích
  setFavoriteHotels: React.Dispatch<React.SetStateAction<number[]>>; // Hàm để thay đổi danh sách yêu thích
  applyFilter: () => void;
  handleStarChange: (stars: number) => void;
  handleReviewChange: (stars: number) => void;
  handlePriceRangeChange: (range: string) => void;
  addToFavorites: (hotelId: number) => void;
  removeFromFavorites: (hotelId: number) => void;
}

export const HotelContext = createContext<HotelContextType | undefined>(
  undefined
);

const HotelProvider = ({ children }: { children: React.ReactNode }) => {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [filter, setFilter] = useState({
    starRatings: [] as number[],
    reviews: [] as number[],
    priceRanges: [] as string[],
  });
  const [hotelCount, setHotelCount] = useState(0);
  const [favoriteHotels, setFavoriteHotels] = useState<number[]>([]); // Danh sách yêu thích

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

  useEffect(() => {
    // Lưu danh sách yêu thích vào LocalStorage mỗi khi danh sách thay đổi
    localStorage.setItem("favoriteHotels", JSON.stringify(favoriteHotels));
  }, [favoriteHotels]);

  const handleStarChange = (stars: number) => {
    setFilter((prev) => ({
      ...prev,
      starRatings: prev.starRatings.includes(stars)
        ? prev.starRatings.filter((star) => star !== stars)
        : [...prev.starRatings, stars],
    }));
  };

  const handleReviewChange = (stars: number) => {
    setFilter((prev) => ({
      ...prev,
      reviews: prev.reviews.includes(stars)
        ? prev.reviews.filter((star) => star !== stars)
        : [...prev.reviews, stars],
    }));
  };

  const handlePriceRangeChange = (range: string) => {
    setFilter((prev) => ({
      ...prev,
      priceRanges: prev.priceRanges.includes(range)
        ? prev.priceRanges.filter((priceRange) => priceRange !== range)
        : [...prev.priceRanges, range],
    }));
  };

  const applyFilter = () => {
    const filteredHotels = hotels.filter((hotel: IHotel) => {
      const starMatch =
        filter.starRatings.length === 0 ||
        filter.starRatings.includes(hotel.rating);
      const reviewMatch =
        filter.reviews.length === 0 || filter.reviews.includes(hotel.review);
      const priceMatch =
        filter.priceRanges.length === 0 ||
        filter.priceRanges.some((range) => {
          const price =
            typeof hotel.price === "string"
              ? parseInt(hotel.price.replace(/[^0-9]/g, ""))
              : hotel.price || 0;

          switch (range) {
            case "under_2000000":
              return price <= 2000000;
            case "2000000_4000000":
              return price > 2000000 && price <= 4000000;
            case "4000000_6000000":
              return price > 4000000 && price <= 6000000;
            case "6000000_8000000":
              return price > 6000000 && price <= 8000000;
            case "above_10000000":
              return price > 10000000;
            default:
              return true;
          }
        });

      return starMatch && reviewMatch && priceMatch;
    });

    setHotelCount(filteredHotels.length);
  };

  // Hàm thêm khách sạn vào yêu thích
  const addToFavorites = (hotelId: number) => {
    if (!favoriteHotels.includes(hotelId)) {
      setFavoriteHotels((prevFavorites) => [...prevFavorites, hotelId]);
    }
  };

  // Hàm xóa khách sạn khỏi yêu thích
  const removeFromFavorites = (hotelId: number) => {
    setFavoriteHotels((prevFavorites) =>
      prevFavorites.filter((id) => id !== hotelId)
    );
  };

  return (
    <HotelContext.Provider
      value={{
        hotels,
        filter,
        setFilter,
        hotelCount,
        setHotelCount,
        favoriteHotels,
        setFavoriteHotels,
        applyFilter,
        handleStarChange,
        handleReviewChange,
        handlePriceRangeChange,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelProvider;

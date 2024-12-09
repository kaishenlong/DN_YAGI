import { useContext, useEffect, useState } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { hotelCT } from "../context/hotel";
import { IHotel } from "../interface/hotel";

interface Filter {
  starRatings: number[];
  reviews: number[];
  priceRanges: string[]; // Thêm trường priceRanges để lưu các khoảng giá
}

interface ProductsProps {
  filter: Filter;
  onHotelCountChange?: (count: number) => void; // Callback để cập nhật số lượng khách sạn
}

const Products = ({ filter, onHotelCountChange }: ProductsProps) => {
  // const [hotels, setHotels] = useState<Hotel[]>([]);
  const { hotels } = useContext(hotelCT);
  console.log(hotels);

  const [favoriteHotels, setFavoriteHotels] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    const updatedFavorites = favoriteHotels.includes(id)
      ? favoriteHotels.filter((hotelId) => hotelId !== id)
      : [...favoriteHotels, id];

    setFavoriteHotels(updatedFavorites);
    localStorage.setItem("favoriteHotels", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteHotels");
    if (storedFavorites) {
      setFavoriteHotels(JSON.parse(storedFavorites));
    }
  }, []);

  // Hàm lọc khách sạn theo bộ lọc (bao gồm khoảng giá)
  const filteredHotels = hotels.filter((hotel: any) => {
    const roundedRating = Math.floor(hotel.rating || 0); // Làm tròn xuống hạng sao
    const matchesStarFilter =
      filter.starRatings.length === 0 ||
      filter.starRatings.includes(roundedRating);
    const matchesReviewFilter =
      filter.reviews.length === 0 || filter.reviews.includes(roundedRating);

    // Lọc theo khoảng giá
    const matchesPriceFilter =
      filter.priceRanges.length === 0 ||
      filter.priceRanges.some((range) => {
        switch (range) {
          case "under_2000000":
            return (
              parseFloat(hotel.price?.replace(/[^0-9.-]+/g, "") || "0") <
              2000000
            );
          case "2000000_4000000":
            return (
              parseFloat(hotel.price?.replace(/[^0-9.-]+/g, "") || "0") >=
                2000000 &&
              parseFloat(hotel.price?.replace(/[^0-9.-]+/g, "") || "0") <=
                4000000
            );
          case "4000000_6000000":
            return (
              parseFloat(hotel.price?.replace(/[^0-9.-]+/g, "") || "0") >=
                4000000 &&
              parseFloat(hotel.price?.replace(/[^0-9.-]+/g, "") || "0") <=
                6000000
            );
          case "6000000_8000000":
            return (
              parseFloat(hotel.price?.replace(/[^0-9.-]+/g, "") || "0") >=
                6000000 &&
              parseFloat(hotel.price?.replace(/[^0-9.-]+/g, "") || "0") <=
                8000000
            );
          case "above_10000000":
            return (
              parseFloat(hotel.price?.replace(/[^0-9.-]+/g, "") || "0") >
              10000000
            );
          default:
            return false;
        }
      });

    return matchesStarFilter && matchesReviewFilter && matchesPriceFilter;
  });

  // Gửi số lượng khách sạn đã lọc lên component cha
  useEffect(() => {
    if (onHotelCountChange) {
      onHotelCountChange(filteredHotels.length);
    }
  }, [filteredHotels, onHotelCountChange]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {filteredHotels.map((hotel: IHotel) => (
        <div key={hotel.id} className="bg-white rounded shadow">
          <div className="relative">
            <Link to={`/products/${hotel.id}`}>
              <img
                src={`http://localhost:8000/storage/${hotel.image}`}
                alt={hotel.name || "No name"}
                className="w-full h-48 object-cover rounded-t"
              />
            </Link>
            <button
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
              onClick={() => toggleFavorite(hotel.id)}
            >
              <Heart
                className={`w-6 h-6 ${
                  favoriteHotels.includes(hotel.id)
                    ? "text-red-500 fill-current"
                    : "text-gray-400"
                }`}
              />
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-2">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(hotel.rating || 0)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <Link
              to={`/products/${hotel.id}`}
              className="text-lg font-bold text-blue-700 hover:underline"
            >
              {hotel.name}
            </Link>
            <div className="text-gray-600 mt-2">
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {typeof hotel.rating === "number"
                  ? hotel.rating.toFixed(1)
                  : "0.0"}
                /5.0
              </span>{" "}
              ({hotel.description || "No reviews yet"})
            </div>
            <div className="text-green-600 font-semibold mt-2">
              Giá: {hotel.price} VND
            </div>
            <div className="text-red-500 font-semibold mt-1">
              Giá khuyến mãi: {hotel.price_surcharge} VND
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

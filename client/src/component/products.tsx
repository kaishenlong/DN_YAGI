import React, { useContext } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { IHotel } from "../interface/hotel";
import { HotelContext } from "../context/hotel";

const Products = ({ hotels }: { hotels: IHotel[] }) => {
  console.log("hotels props:", hotels);
  const { favoriteHotels, setFavoriteHotels } = useContext(HotelContext);

  const toggleFavorite = (id: number) => {
    const updatedFavorites = favoriteHotels.includes(id)
      ? favoriteHotels.filter((hotelId: number | string) => hotelId !== id)
      : [...favoriteHotels, id];
    setFavoriteHotels(updatedFavorites);
    localStorage.setItem("favoriteHotels", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {hotels.map((hotel: IHotel) => (
        <div key={hotel.id} className="bg-white rounded shadow">
          {/* Phần hiển thị ảnh và nút yêu thích */}
          <div className="relative">
            <Link to={`/hotel/${hotel.id}`}>
              {/* Thay đổi đường dẫn */}
              <img
                src={
                  hotel.image
                    ? `http://localhost:8000/storage/${hotel.image}`
                    : "/placeholder-image.jpg" // Đường dẫn tới ảnh mặc định
                }
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
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              />
            </button>
          </div>

          {/* Phần hiển thị thông tin khách sạn */}
          <div className="p-4">
            {/* Hiển thị đánh giá sao */}
            <div className="flex items-center mb-2">
              {Array(5)
                .fill(null)
                .map((_, i) => {
                  const rating = Number(hotel.rating) || 0; // Đảm bảo rating là số
                  const isFullStar = i < Math.floor(rating); // Sao đầy đủ
                  const isHalfStar = i < rating && i >= Math.floor(rating); // Sao nửa
                  return (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        isFullStar
                          ? "text-yellow-400 fill-current" // Sao đầy đủ
                          : isHalfStar
                          ? "text-yellow-400 fill-current opacity-50" // Sao nửa
                          : "text-gray-300"
                      }`}
                    />
                  );
                })}
              {(!hotel.rating || hotel.rating === 0) && (
                <span className="text-gray-500 ml-2 text-sm">
                  Chưa có đánh giá
                </span>
              )}
            </div>

            {/* Tên khách sạn và đường dẫn */}
            <Link
              to={`/hotel/${hotel.id}`} // Thay đổi đường dẫn
              className="text-lg font-bold text-blue-700 hover:underline"
            >
              {hotel.name || "Khách sạn không có tên"}
            </Link>

            {/* Mô tả khách sạn */}
            <div className="text-gray-600 mt-2">
              {hotel.description || "Không có mô tả"}
            </div>

            {/* Giá khách sạn */}
            <div className="mt-2">
              <span className="text-gray-700 font-semibold">Giá Gốc: </span>
              {hotel.price ? (
                <span className="text-green-600 font-semibold line-through">
                  {Number(hotel.price).toLocaleString()} VND
                </span>
              ) : (
                <span className="text-gray-500">Chưa cập nhật</span>
              )}
            </div>
            <div className="text-red-500 font-semibold mt-1">
              {hotel.price_surcharge ? (
                <span>
                  Giá đã sale: {Number(hotel.price_surcharge).toLocaleString()}{" "}
                  VND
                </span>
              ) : (
                "Giá khuyến mãi chưa được cập nhật"
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

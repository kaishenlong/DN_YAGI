import React, { useContext, useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { IHotel } from "../interface/hotel";
import { HotelContext } from "../context/hotel";

const Products = ({ hotels }: any) => {
  const { favoriteHotels, setFavoriteHotels } = useContext(HotelContext) as any;

  const toggleFavorite = (id: number) => {
    const updatedFavorites = favoriteHotels.includes(id)
      ? favoriteHotels.filter((hotelId: number) => hotelId !== id)
      : [...favoriteHotels, id];
    setFavoriteHotels(updatedFavorites);
    localStorage.setItem("favoriteHotels", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {hotels.map((hotel: IHotel) => (
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
                  favoriteHotels?.includes(hotel.id)
                    ? "text-red-500"
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
            <div className="text-gray-600 mt-2">{hotel.description}</div>
            <div className="text-green-600 font-semibold mt-2">
              {hotel.price} VND
            </div>
            <div className="text-red-500 font-semibold mt-1">
              {hotel.price_surcharge} VND
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

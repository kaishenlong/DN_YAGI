import { useState } from "react";
import { Heart, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {};
interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
}

const hotels: Hotel[] = Array(1)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: "Grand Resort Sapa-Lao Cai",
    location: "Sapa-Lao Cai",
    rating: 4.0,
    reviews: 1,
    price: 1000000,
    image: "src/upload/dt1.png",
  }));
const Products = (props: Props) => {
  const [favoriteHotels, setFavoriteHotels] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavoriteHotels((prev) =>
      prev.includes(id)
        ? prev.filter((hotelId) => hotelId !== id)
        : [...prev, id]
    );
  };
  return (
    <>
      <div>
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded shadow">
            <div className="relative">
              <Link to={"/products"}>
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover rounded-t"
                />
              </Link>
              <button
                className="absolute top-2 right-2 bg-white p-1 rounded-full"
                onClick={() => toggleFavorite(hotel.id)}
              >
                <Heart
                  className={`w-5 h-5 ${
                    favoriteHotels.includes(hotel.id)
                      ? "text-red-500 fill-current"
                      : "text-gray-500"
                  }`}
                />
              </button>
              <div className="absolute bottom-2 left-2 bg-white rounded-full py-1 px-2 flex items-center shadow-md">
                <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                <span>Sapa- Lào Cai</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-2">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 mx-1 h-4 ${
                        i < Math.floor(hotel.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                <span className="ml-1 text-sm text-gray-600"></span>
              </div>
              <Link to={"/products"} className="font-bold mb-2">
                {hotel.name}
              </Link>
              <div className="text-gray-600 pt-3">
                <span className="bg-[#00396B96] text-white font-bold p-1 rounded">
                  {hotel.rating.toFixed(1)}/5.0{" "}
                </span>{" "}
                ({hotel.reviews} review)
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="font-bold text-lg">
                  <span className="text-base text-[#716868]">Giá : </span>{" "}
                  {hotel.price.toLocaleString()}Đ
                </span>
                <span className="text-sm text-red-500 line-through">
                  {(hotel.price * 1.5).toLocaleString()}Đ
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;

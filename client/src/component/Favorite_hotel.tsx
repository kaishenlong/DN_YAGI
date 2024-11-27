import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Hotel {
  id: number;
  name: string;
  image: string;
  rating: number;
  description: string;
}

const Love = () => {
  const [favoriteHotels, setFavoriteHotels] = useState<number[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    // Lấy danh sách yêu thích từ LocalStorage
    const storedFavorites = localStorage.getItem("favoriteHotels");
    if (storedFavorites) {
      setFavoriteHotels(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/hotel");
        setHotels(res.data.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotel();
  }, []);

  const toggleFavorite = (id: number) => {
    const updatedFavorites = favoriteHotels.includes(id)
      ? favoriteHotels.filter((hotelId) => hotelId !== id)
      : [...favoriteHotels, id];

    setFavoriteHotels(updatedFavorites);
    localStorage.setItem("favoriteHotels", JSON.stringify(updatedFavorites));
  };

  const favoriteHotelList = hotels.filter((hotel) =>
    favoriteHotels.includes(hotel.id)
  );

  return (
    <div className="grid grid-cols-3 gap-1">
      {favoriteHotelList.map((hotel) => (
        <div key={hotel.id} className="bg-white rounded shadow">
          <div className="relative">
            <Link to={`/products/${hotel.id}`}>
              <img
                src={hotel.image || "/default-image.jpg"}
                alt={hotel.name || "No name"}
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
          </div>
          <div className="p-4">
            <h3 className="font-bold">{hotel.name}</h3>
            <p>{hotel.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Love;

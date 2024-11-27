import { useEffect, useState } from "react";
import { Heart, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Hotel {
  id: number;
  name: string;
  image: string;
  rating: number;
  description: string;
}

interface Filter {
  starRatings: number[];
  reviews: number[];
}

const Products = ({ filter }: { filter: Filter }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
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

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/hotel");
        const data = res.data.data.map((hotel: any) => ({
          ...hotel,
          rating:
            typeof hotel.rating === "string"
              ? parseFloat(hotel.rating)
              : hotel.rating || 0,
        }));
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setHotels([]);
      }
    };
    fetchHotel();
  }, []);

  // Lọc khách sạn dựa trên bộ lọc
  const filteredHotels = hotels.filter((hotel) => {
    const roundedRating = Math.floor(hotel.rating); // Làm tròn xuống hạng sao
    const roundedReview = Math.floor(hotel.rating); // Làm tròn xuống đánh giá

    // Kiểm tra các tiêu chí lọc
    const matchesStarFilter =
      filter.starRatings.length === 0 || filter.starRatings.includes(roundedRating);
    const matchesReviewFilter =
      filter.reviews.length === 0 || filter.reviews.includes(roundedReview);

    return matchesStarFilter && matchesReviewFilter;
  });

  return (
    <div className="grid grid-cols-3 gap-1">
      {filteredHotels.map((hotel) => (
        <div key={hotel.id} className="bg-white rounded shadow">
          <div className="relative">
            <Link to={`/products/${hotel.id}`}>
              <img
                src={hotel.image || "/path/to/default-image.jpg"}
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
            <div className="absolute bottom-2 left-2 bg-white rounded-full py-1 px-2 flex items-center shadow-md">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <span>{hotel.description || "Unknown location"}</span>
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
                      i < Math.floor(hotel.rating || 0)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <Link to={`/products/${hotel.id}`} className="font-bold mb-2">
              {hotel.name}
            </Link>
            <div className="text-gray-600 pt-3">
              <span className="bg-[#00396B96] text-white font-bold p-1 rounded">
                {hotel.rating?.toFixed(1) || "0.0"}/5.0{" "}
              </span>{" "}
              ({hotel.description || "No"} review)
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

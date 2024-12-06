import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import style Toastify

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

  const toggleFavorite = (id: number, name: string) => {
    const updatedFavorites = favoriteHotels.includes(id)
      ? favoriteHotels.filter((hotelId) => hotelId !== id)
      : [...favoriteHotels, id];

    setFavoriteHotels(updatedFavorites);
    localStorage.setItem("favoriteHotels", JSON.stringify(updatedFavorites));

    // Hiển thị thông báo khi bỏ yêu thích
    if (favoriteHotels.includes(id)) {
      toast.error(`Đã bỏ yêu thích khách sạn: ${name}`);
    } else {
      toast.success(`Đã thêm yêu thích khách sạn: ${name}`);
    }
  };

  const favoriteHotelList = hotels.filter((hotel) =>
    favoriteHotels.includes(hotel.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Đây là trang yêu thích</h1>
        <Link to="/category" className="text-blue-600 hover:underline">
          Quay lại trang Category
        </Link>
      </div>

      {favoriteHotelList.length === 0 ? (
        <p className="text-center text-2xl text-gray-500 mt-8">
          Bạn chưa yêu thích Sản Phẩm nào
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteHotelList.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <Link to={`/products/${hotel.id}`}>
                  <img
                    src={hotel.image || "/default-image.jpg"}
                    alt={hotel.name || "No name"}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <button
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
                  onClick={() => toggleFavorite(hotel.id, hotel.name)} // Passing hotel name here
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
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">{hotel.name}</h3>
                <p className="text-gray-600 mt-2">{hotel.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Love;

import { useContext } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HotelContext } from "../context/hotel";

const Love = () => {
  const { hotels, favoriteHotels, setFavoriteHotels } =
    useContext(HotelContext)!;

  const toggleFavorite = (id: number, name: string) => {
    const updatedFavorites = favoriteHotels.includes(id)
      ? favoriteHotels.filter((hotelId) => hotelId !== id)
      : [...favoriteHotels, id];

    setFavoriteHotels(updatedFavorites);

    // Hiển thị thông báo khi thêm/bỏ yêu thích
    if (updatedFavorites.includes(id)) {
      toast.success(`Đã thêm yêu thích khách sạn: ${name}`);
    } else {
      toast.error(`Đã bỏ yêu thích khách sạn: ${name}`);
    }
  };

  // Lọc các khách sạn yêu thích
  const favoriteHotelList = hotels.filter((hotel) =>
    favoriteHotels.includes(hotel.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Đây là trang yêu thích
        </h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Quay lại trang chủ
        </Link>
      </div>

      {favoriteHotelList.length === 0 ? (
        <p className="text-center text-2xl text-gray-500 mt-8">
          Bạn chưa yêu thích Sản Phẩm nào
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteHotelList.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative">
                <Link to={`/products/${hotel.id}`}>
                  <img
                    src={`http://localhost:8000/storage/${hotel.image}`}
                    alt={hotel.name || "No name"}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <button
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
                  onClick={() => toggleFavorite(hotel.id, hotel.name)}
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
                <h3 className="font-semibold text-lg text-gray-800">
                  {hotel.name}
                </h3>
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

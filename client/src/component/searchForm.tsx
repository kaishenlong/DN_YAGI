import React, { useState, useEffect } from "react";
import axios from "axios";
import { City, IHotel } from "../interface/hotel";
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng
import { Search } from "lucide-react";

const HotelSearchForm = () => {
  const [searchInput, setSearchInput] = useState(""); // Tìm kiếm theo tên khách sạn
  const [cities, setCities] = useState<City[]>([]);
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<IHotel[]>([]); // Kết quả tìm kiếm
  const navigate = useNavigate(); // Hook điều hướng

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/city", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCities(res.data.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const fetchHotels = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/hotel", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setHotels(res.data.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchCities();
    fetchHotels();
  }, []);

  useEffect(() => {
    if (searchInput) {
      const results = hotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          cities
            .find((city) => city.id === hotel.city_id)
            ?.name.toLowerCase()
            .includes(searchInput.toLowerCase())
      );
      setFilteredHotels(results);
    } else {
      setFilteredHotels([]);
    }
  }, [searchInput, hotels, cities]);

  // Bôi đậm từ khóa tìm kiếm trong kết quả
  const highlightText = (text: string, keyword: string) => {
    if (!keyword) return text;

    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className="font-bold text-orange-500">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-4">
        TÌM KHÁCH SẠN GIÁ TỐT
      </h1>
      <div className="flex justify-center">
        <div className="w-16 h-[2px] bg-orange-400 mb-4"></div>
      </div>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Search Input */}
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Nhập địa điểm, tên khách sạn ..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          {/* Dropdown kết quả tìm kiếm */}
          {filteredHotels.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
              {filteredHotels.map((hotel) => (
                <li
                  key={hotel.id}
                  className="flex items-center gap-4 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSearchInput(hotel.name)} // Chọn khách sạn từ kết quả
                >
                  {/* Hiển thị ảnh khách sạn */}
                  <img
                    src={`http://localhost:8000/storage/${hotel.image}`} // URL của ảnh khách sạn
                    alt={hotel.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />

                  {/* Hiển thị tên khách sạn với logic tô đậm từ khóa */}
                  <span className="flex-1">
                    {highlightText(hotel.name, searchInput)}
                  </span>

                  {/* Nút hình kính lúp */}
                  <Search
                    type="button"
                    className="text-orange-500 hover:text-orange-700"
                    onClick={() => navigate(`/hotel/${hotel.id}`)} // Điều hướng đến trang chi tiết
                  ></Search>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
};

export default HotelSearchForm;

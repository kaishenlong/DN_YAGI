import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HotelSearchForm = () => {
  const [searchInput, setSearchInput] = useState(""); // Tìm kiếm theo tên khách sạn
  // const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  // const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Lấy danh sách thành phố từ API
  //   const fetchCities = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8000/api/city");
  //       setCities(res.data.data);
  //     } catch (error) {
  //       console.error("Error fetching cities:", error);
  //     }
  //   };
  //   fetchCities();
  // }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Chuyển hướng đến trang Category với tham số tìm kiếm
    const queryParams = new URLSearchParams();
    if (searchInput) queryParams.append("name", searchInput);
    // if (selectedCity) queryParams.append("city_id", selectedCity.toString());
    navigate(`/category?${queryParams.toString()}`);
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
        onSubmit={handleSearch}
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
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-orange-400 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Tìm kiếm
        </button>
      </form>
    </div>
  );
};

export default HotelSearchForm;

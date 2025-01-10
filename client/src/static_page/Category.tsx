import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../component/products";
import { getallRoom } from "../service/room";
import { City, IHotel } from "../interface/hotel";
import { getallHotels } from "../service/hotel";
import { getallCitys } from "../service/city";

const Category = () => {
  const { id } = useParams();
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<IHotel[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [cityName, setCityName] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  console.log("hotel:", hotels); // Kiểm tra xem dữ liệu hotel.rating có tồn tại không
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getallHotels();
        const rooms = await getallRoom();
        const city = await getallCitys();

        const filteredHotels = data.data.filter(
          (hotel: IHotel) => hotel.city_id === Number(id)
        );
        const nameCity = city.data.find(
          (city: City) => city.id === filteredHotels[0]?.city_id
        );
        setCityName(nameCity ? nameCity.name : null);

        const combinedData = filteredHotels.map((hotel: IHotel) => {
          const room = rooms.data.find((r: any) => r.hotel_id === hotel.id);
          return {
            ...hotel,
            price: room?.price || "Chưa có giá",
            price_surcharge: room?.price_surcharge || "Chưa có giá",
          };
        });

        setHotels(combinedData);
        setFilteredHotels(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const priceRanges = [
    { value: "0_2000000", label: "Dưới 2.000.000đ" },
    { value: "2000000_4000000", label: "2.000.000đ - 4.000.000đ" },
    { value: "4000000_6000000", label: "4.000.000đ - 6.000.000đ" },
    { value: "6000000_8000000", label: "6.000.000đ - 8.000.000đ" },
    { value: "8000000_10000000", label: "8.000.000đ - 10.000.000đ" },
    { value: "10000000_", label: "Trên 10.000.000đ" },
  ];

  const handleFilter = () => {
    let filtered = hotels;

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("_").map(Number);
      filtered = filtered.filter((hotel) => {
        const price = Number(hotel.price_surcharge) || 0;
        return max ? price >= min && price <= max : price >= min;
      });
    }

    if (selectedStars.length > 0) {
      filtered = filtered.filter((hotel) =>
        selectedStars.includes(Math.round(hotel.rating))
      );
    }

    setFilteredHotels(filtered);
  };

  const toggleStarFilter = (star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  const resetFilters = () => {
    setSelectedPriceRange(null);
    setSelectedStars([]);
    setFilteredHotels(hotels);
  };

  return (
    <div className="w-full">
      <div className="relative h-[300px] w-full">
        <div className="absolute w-full h-[399px] bg-gradient-to-r from-[#007bff] to-[#FFD700] text-center">
          <p className="font-taviraj text-[61px] italic font-extrabold mt-[150px] text-[#FFD700]">
            <span style={{ textShadow: "1px 1px 2px #fff" }}>
              Thành phố: {cityName}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-[150px] w-full p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4 pl-[410px]">
            Kết quả tìm kiếm: {filteredHotels.length} khách sạn
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full ml-10 md:w-1/4">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-bold mb-2">Hạng sao</h2>
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedStars.includes(stars)}
                    onChange={() => toggleStarFilter(stars)}
                  />
                  {Array(stars)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 mx-1 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                </div>
              ))}

              <h2 className="font-bold mt-4 mb-2">Khoảng giá</h2>
              {priceRanges.map((range) => (
                <div key={range.value} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="priceRange"
                    className="mr-2"
                    checked={selectedPriceRange === range.value}
                    onChange={() => setSelectedPriceRange(range.value)}
                  />
                  <span>{range.label}</span>
                </div>
              ))}

              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleFilter}
              >
                Tìm kiếm
              </button>
              <button
                className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                onClick={resetFilters}
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {filteredHotels.length > 0 ? (
              <Products hotels={filteredHotels} />
            ) : (
              <div className="text-center text-gray-500">
                Không tìm thấy khách sạn nào phù hợp.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

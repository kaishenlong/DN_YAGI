import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { HotelContext } from "../context/hotel";
import Products from "../component/products";

const Category = () => {
  const { id } = useParams();
  const {
    hotels,
    filter,
    setHotelCount,
    handleStarChange,
    handleReviewChange,
    handlePriceRangeChange,
    applyFilter,
    hotelCount,
  } = useContext(HotelContext) as any;
  const [filteredHotels, setFilteredHotels] = useState<any[]>([]);

  // Lọc khách sạn theo thành phố
  useEffect(() => {
    if (id) {
      const cityHotels = hotels.filter(
        (hotel: any) => hotel.city_id === Number(id)
      );
      setFilteredHotels(cityHotels);
      setHotelCount(cityHotels.length); // Cập nhật số lượng khách sạn
    }
  }, [id, hotels, setHotelCount]);

  // Áp dụng các bộ lọc sao, đánh giá và khoảng giá
  useEffect(() => {
    const applyFilters = () => {
      let updatedHotels = [...filteredHotels]; // Dùng filteredHotels đã lọc theo thành phố

      // Nếu không có bộ lọc nào được chọn, trả lại tất cả khách sạn của thành phố
      if (
        filter.starRatings.length === 0 &&
        filter.reviews.length === 0 &&
        filter.priceRanges.length === 0
      ) {
        updatedHotels = [...filteredHotels]; // Khôi phục danh sách đầy đủ theo thành phố
      } else {
        // Lọc theo hạng sao
        if (filter.starRatings.length > 0) {
          updatedHotels = updatedHotels.filter((hotel: any) =>
            filter.starRatings.includes(hotel.star_rating)
          );
        }

        // Lọc theo đánh giá
        if (filter.reviews.length > 0) {
          updatedHotels = updatedHotels.filter((hotel: any) =>
            filter.reviews.includes(hotel.review_rating)
          );
        }

        // Lọc theo khoảng giá
        if (filter.priceRanges.length > 0) {
          updatedHotels = updatedHotels.filter((hotel: any) => {
            const price = parseInt(hotel.price.replace(/[^0-9]/g, "")); // Xóa các ký tự không phải số
            return filter.priceRanges.some((range: string) => {
              switch (range) {
                case "under_2000000":
                  return price < 2000000;
                case "2000000_4000000":
                  return price >= 2000000 && price <= 4000000;
                case "4000000_6000000":
                  return price >= 4000000 && price <= 6000000;
                case "6000000_8000000":
                  return price >= 6000000 && price <= 8000000;
                case "above_10000000":
                  return price > 10000000;
                default:
                  return true;
              }
            });
          });
        }
      }

      // Cập nhật filteredHotels và hotelCount
      setFilteredHotels(updatedHotels);
      setHotelCount(updatedHotels.length); // Cập nhật số lượng khách sạn sau khi lọc
    };

    if (filteredHotels.length > 0) {
      applyFilters(); // Áp dụng bộ lọc khi filteredHotels có dữ liệu
    }
  }, [filter, filteredHotels.length, setHotelCount]); // Chỉ thêm filteredHotels.length vào dependencies để tránh vòng lặp

  return (
    <div className="w-full">
      <div className="relative h-[300px] w-full">
        <div
          style={{
            backgroundColor: "#4CAF50", // Set the background color here (green example)
          }}
          className="absolute w-full h-[399px]"
        >
          <p className="font-taviraj text-[61px] italic font-extrabold text-center mt-[150px] text-[#FFFFFF]">
            Thành phố {id}
          </p>
        </div>
      </div>
      <div className="mt-[150px] w-full p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4 pl-[410px]">
            Kết quả tìm kiếm: {hotelCount} khách sạn
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
                    onChange={() => handleStarChange(stars)}
                    checked={filter.starRatings.includes(stars)}
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

              <h2 className="font-bold mt-4 mb-2">Đánh giá</h2>
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleReviewChange(stars)}
                    checked={filter.reviews.includes(stars)}
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
              {[
                {
                  label: "Dưới 2.000.000",
                  value: "under_2000000",
                },
                {
                  label: "Từ 2.000.000 - 4.000.000",
                  value: "2000000_4000000",
                },
                {
                  label: "Từ 4.000.000 - 6.000.000",
                  value: "4000000_6000000",
                },
                {
                  label: "Từ 6.000.000 - 8.000.000",
                  value: "6000000_8000000",
                },
                {
                  label: "Trên 10.000.000",
                  value: "above_10000000",
                },
              ].map((range) => (
                <div key={range.value} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handlePriceRangeChange(range.value)}
                    checked={filter.priceRanges.includes(range.value)}
                  />
                  <span>{range.label}</span>
                </div>
              ))}

              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={applyFilter}
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {/* Pass the filter and filtered hotels to Products */}
            <Products filter={filter} hotels={filteredHotels} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

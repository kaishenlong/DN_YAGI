import { Star } from "lucide-react";
import Products from "./products";
import { Link } from "react-router-dom";
import { useState } from "react";

const CategoryHotel = () => {
  const [tempFilter, setTempFilter] = useState({
    starRatings: [] as number[],
    reviews: [] as number[],
    priceRanges: [] as string[], // Lưu các khoảng giá được chọn
  });
  const [filter, setFilter] = useState({
    starRatings: [] as number[],
    reviews: [] as number[],
    priceRanges: [] as string[],
  });
  const [hotelCount, setHotelCount] = useState(0); // Số lượng khách sạn

  const handleStarChange = (stars: number) => {
    setTempFilter((prev) => ({
      ...prev,
      starRatings: prev.starRatings.includes(stars)
        ? prev.starRatings.filter((star) => star !== stars)
        : [...prev.starRatings, stars],
    }));
  };

  const handleReviewChange = (stars: number) => {
    setTempFilter((prev) => ({
      ...prev,
      reviews: prev.reviews.includes(stars)
        ? prev.reviews.filter((star) => star !== stars)
        : [...prev.reviews, stars],
    }));
  };

  const handlePriceRangeChange = (range: string) => {
    setTempFilter((prev) => ({
      ...prev,
      priceRanges: prev.priceRanges.includes(range)
        ? prev.priceRanges.filter((priceRange) => priceRange !== range)
        : [...prev.priceRanges, range],
    }));
  };

  const applyFilter = () => {
    setFilter(tempFilter); // Áp dụng bộ lọc từ tempFilter
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4 pl-[410px]">
          Kết quả tìm kiếm: {hotelCount} khách sạn
        </h1>
        <Link to="/Favorites" className="text-blue-500 text-2xl font-bold mb-4">
          Xem danh sách yêu thích
        </Link>
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
                  checked={tempFilter.starRatings.includes(stars)}
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
                  checked={tempFilter.reviews.includes(stars)}
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
              { label: "Dưới 2.000.000", value: "under_2000000" },
              { label: "Từ 2.000.000 - 4.000.000", value: "2000000_4000000" },
              { label: "Từ 4.000.000 - 6.000.000", value: "4000000_6000000" },
              { label: "Từ 6.000.000 - 8.000.000", value: "6000000_8000000" },
              { label: "Trên 10.000.000", value: "above_10000000" },
            ].map((range) => (
              <div key={range.value} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handlePriceRangeChange(range.value)}
                  checked={tempFilter.priceRanges.includes(range.value)}
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
          {/* Truyền callback để nhận số lượng khách sạn */}
          <Products filter={filter} onHotelCountChange={setHotelCount} />
        </div>
      </div>
    </div>
  );
};

export default CategoryHotel;

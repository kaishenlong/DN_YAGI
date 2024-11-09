import { Star } from "lucide-react";
import Products from "./products";
const Favorite_hotel = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Danh sách yêu thích của bạn
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Hạng sao</h2>
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center mb-2">
                <input type="checkbox" className="mr-2" />
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
                <input type="checkbox" className="mr-2" />
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
            <h2 className="font-bold mt-4 mb-2">Ngân sách</h2>
            {[
              "Dưới 2.000.000Đ",
              "2.000.000 - 4.000.000",
              "4.000.000 - 6.000.000",
              "6.000.000 - 8.000.000",
              "8.000.000 - 10.000.000",
            ].map((range) => (
              <div key={range} className="mb-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {range}
                </label>
              </div>
            ))}
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="bg-white p-4 rounded shadow mb-4">
            <div className="flex justify-between">
              <button className="px-4 py-2 border-b-2 border-blue-500">
                Phổ biến
              </button>
              <button className="px-4 py-2">Mới nhất</button>
              <button className="px-4 py-2">Yêu thích</button>
              <button className="px-4 py-2">Giá tăng dần</button>
              <button className="px-4 py-2">Giá giảm dần</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <Products />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Favorite_hotel;

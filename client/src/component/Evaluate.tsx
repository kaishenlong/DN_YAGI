import React from "react";
import { Star } from "lucide-react";

type Props = {};

const Evaluate = (props: Props) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <hr className="w-full my-6" />
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Đánh giá</h1>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Phần bên trái - Tổng điểm */}
        <div className="flex flex-col items-center justify-center border p-6 rounded-lg w-full lg:w-1/4">
          <div className="text-blue-600 text-4xl font-bold flex items-baseline">
            4.0<span className="text-xl ml-1">/5</span>
          </div>
          <div className="text-lg font-semibold mt-2">Xuất sắc</div>
          <div className="text-gray-500 text-sm mt-1">Từ 150 khách hàng</div>
          <div className="flex mt-2">
            {[1, 2, 3, 4].map((star) => (
              <Star
                key={star}
                className="w-5 h-5 text-yellow-400 fill-current"
              />
            ))}
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
        </div>

        {/* Phần bên phải - Các tiêu chí */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-3/4">
          {[
            "Dịch vụ",
            "Tiện ích",
            "Vị trí",
            "Không gian",
            "Giá cả",
            "Thiết kế",
          ].map((criterion) => (
            <div key={criterion}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm sm:text-base">{criterion}</span>
                <span className="text-sm sm:text-base font-semibold">5.0</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="w-full my-8" />
    </div>
  );
};

export default Evaluate;

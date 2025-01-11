import React, { createContext, useContext, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { hotelCT } from "../context/hotel";
import { UserCT } from "../context/user";
import { ReviewCT } from "../context/review";
import { PaymentCT } from "../context/payment";
// export const HotelContext = createContext({ hotels: 0 });
// export const UserContextType = createContext({ users: 0 });
// export const ReviewContextType = createContext({ review: 0 });
// export const PaymentContext = createContext({ payment: 0 });

const StatisticsDashboard = () => {
  const { hotels } = useContext(hotelCT);
  const { users } = useContext(UserCT);
  const { review } = useContext(ReviewCT);
  const { payment } = useContext(PaymentCT);
  const [showBarChart, setShowBarChart] = useState(true); // Trạng thái để hiển thị biểu đồ cột hoặc tròn

  const data = {
    labels: ["Khách sạn", "Người dùng", "Đánh giá", "Thanh toán"],
    datasets: [
      {
        label: "Tổng quan thống kê",
        data: [
          hotels?.length || 0, // Số lượng khách sạn
          users?.length || 0, // Số lượng người dùng
          review?.length || 0, // Số lượng đánh giá
          payment?.length || 0, // Số lượng thanh toán
        ],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f1c40f"],
        borderWidth: 1,
      },
    ],
  };

  console.log("Số lượng khách sạn:", hotels?.length);
  console.log("Số lượng người dùng:", users?.length);
  console.log("Số lượng đánh giá:", review?.length);
  console.log("Số lượng thanh toán:", payment?.length);

  return (
    <div className="p-12 bg-gray-100 w-[1000px] flex flex-col items-center">
      <h2 className="text-4xl font-bold text-gray-700 mb-8">
        Bảng điều khiển thống kê
      </h2>

      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-xl">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowBarChart(true)}
            className={`px-6 py-2 rounded-l-lg font-medium ${
              showBarChart
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Biểu đồ cột
          </button>
          <button
            onClick={() => setShowBarChart(false)}
            className={`px-6 py-2 rounded-r-lg font-medium ${
              !showBarChart
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Biểu đồ tròn
          </button>
        </div>

        {/* Hiển thị biểu đồ tùy theo trạng thái */}
        <div className="w-full h-96">
          {showBarChart ? (
            <Bar data={data} options={{ maintainAspectRatio: false }} />
          ) : (
            <Pie data={data} options={{ maintainAspectRatio: false }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;

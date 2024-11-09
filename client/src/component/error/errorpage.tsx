import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-5">404</h1>
      <p className="text-2xl text-gray-600 mb-5">Oops! Trang không tồn tại.</p>
      <p className="text-lg text-gray-500 mb-5 text-center max-w-md">
        Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không
        khả dụng.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
      >
        Trở về Trang chủ
      </Link>
    </div>
  );
};

export default ErrorPage;

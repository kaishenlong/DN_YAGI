import React, { useContext, useState } from "react";
import { ReviewCT } from "../context/review";
import { IReview } from "../interface/review";

const Reviews = () => {
  const { review, deleteReview } = useContext(ReviewCT);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 20;

  // Calculate the total pages
  const totalPages = Math.ceil(review.length / reviewsPerPage);

  // Get reviews for the current page
  const currentReviews = review.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  // Handle page navigation
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="p-4 xl:mr-100 bg-white shadow-md rounded-lg">
      <nav className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 shadow-md rounded-lg">
        <div>
          <nav
            aria-label="breadcrumb"
            className="text-sm text-gray-500 flex items-center gap-2"
          >
            <a href="#" className="hover:text-blue-500">
              Dashboard
            </a>
            <span>/</span>
            <p className="font-semibold text-gray-800">Quản Lý Tài Khoản</p>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">
            Quản Lý Đánh Giá
          </h1>
        </div>
      </nav>

      <div className="mt-4 w-full max-w-screen-xl">
        <div className="mb-4 grid grid-cols-1 gap-6">
          <div className="bg-white p-6">
            <div className="overflow-x-auto rounded-xl">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      STT
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Tên Khách Hàng
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Nội Dung
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Điểm Đánh Giá
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Ngày Đánh Giá
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Khách Sạn Đánh Giá
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Chức Năng
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {currentReviews.length > 0 ? (
                    currentReviews.map((item: IReview, index: number) => (
                      <tr key={item.id} className="hover:bg-gray-600">
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {(currentPage - 1) * reviewsPerPage + index + 1}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.user?.name || "N/A"}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.comment}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.rating}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {new Date(item.created_at).toLocaleDateString(
                            "vi-VN"
                          )}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.hotel?.name || "N/A"}
                        </td>
                        <td className="py-6 px-4 flex justify-center gap-2">
                          <button
                            onClick={() => deleteReview(item.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-lg transition"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Không có đánh giá nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            } rounded-lg`}
          >
            Trước
          </button>
          <span className="text-sm text-gray-600">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-medium ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            } rounded-lg`}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

import React, { useContext } from "react";
import { ReviewCT } from "../context/review";
import { IReview } from "../interface/review";

const Reviews = () => {
  const { review, deleteReview } = useContext(ReviewCT);

  return (
    <div className="w-[1200px]">
      <nav className="block w-full bg-transparent text-white rounded-xl px-0 py-1">
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="capitalize">
            <nav aria-label="breadcrumb">
              <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md p-0">
                <li className="flex items-center text-blue-gray-900 text-sm font-normal leading-normal">
                  <a href="#">
                    <p className="text-blue-900 opacity-50 hover:text-blue-500">
                      dashboard
                    </p>
                  </a>
                  <span className="text-gray-500 mx-2">/</span>
                </li>
                <li className="text-blue-900 text-sm font-normal leading-normal">
                  Đánh Giá
                </li>
              </ol>
            </nav>
            <h6 className="text-gray-900 font-semibold text-base">
              Quản Lý Đánh Giá
            </h6>
          </div>
        </div>
      </nav>

      <div className="mt-12">
        <div className="grid gap-3 2xl:grid-cols-1">
          <div className="relative bg-white text-gray-700 shadow-md overflow-hidden rounded-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-xs text-gray-700 uppercase">
                      STT
                    </th>
                    <th className="py-3 px-6 text-xs text-gray-700 uppercase">
                      Tên Khách Hàng
                    </th>
                    <th className="py-3 px-6 text-xs text-gray-700 uppercase">
                      Nội Dung
                    </th>
                    <th className="py-3 px-6 text-xs text-gray-700 uppercase">
                      Điểm Đánh Giá
                    </th>
                    <th className="py-3 px-6 text-xs text-gray-700 uppercase">
                      Ngày Đánh Giá
                    </th>
                    <th className="py-3 px-6 text-xs text-gray-700 uppercase">
                      Khách Sạn Đánh Giá
                    </th>
                    <th className="py-3 px-6 text-xs text-gray-700 uppercase">
                      Chức Năng
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {review.map((item: IReview, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">{item.user?.name || "N/A"}</td>
                      <td className="py-4 px-6">{item.comment}</td>
                      <td className="py-4 px-6">{item.rating}</td>
                      <td className="py-4 px-6">
                        {new Date(item.created_at).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="py-4 px-6">{item.hotel?.name || "N/A"}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => deleteReview(item.id)}
                          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { TypeRoomCT } from "../../context/typeRoom";
import { IType_Room } from "../../interface/rooms";

const TypeRoomList = () => {
  const { types, onDelete } = useContext(TypeRoomCT);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số phần tử mỗi trang

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), "dd/MM/yyyy");
    } catch (error) {
      console.error("Invalid date format:", date);
      return date;
    }
  };

  // Tính toán phần tử hiển thị cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = types.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(types.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 xl:mr-100 bg-white shadow-md rounded-lg">
      {/* ... Header và nút thêm loại phòng */}
      <div className="flex justify-between mt-4">
        <Link
          to={"addtype"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Thêm Loại Phòng
        </Link>
      </div>

      <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 mt-4">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {/* ... Header của bảng */}
            <th className="py-3 px-6 text-xs font-medium text-left uppercase text-gray-700 dark:text-gray-400">
              STT
            </th>
            <th className="py-3 px-6 text-xs font-medium text-left uppercase text-gray-700 dark:text-gray-400">
              Loại Phòng
            </th>
            <th className="py-3 px-6 text-xs font-medium text-left uppercase text-gray-700 dark:text-gray-400">
              Giường
            </th>
            <th className="py-3 px-6 text-xs font-medium text-left uppercase text-gray-700 dark:text-gray-400">
              Ngày Tạo
            </th>
            <th className="py-3 px-6 text-xs font-medium text-left uppercase text-gray-700 dark:text-gray-400">
              Ngày Cập Nhật
            </th>
            <th className="py-3 px-6 text-xs font-medium text-left uppercase text-gray-700 dark:text-gray-400">
              Chức Năng
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((TypeR: IType_Room, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 dark:text-white">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 dark:text-white">
                  {TypeR.type_room}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 dark:text-white">
                  {TypeR.bed}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 dark:text-white">
                  {formatDate(TypeR.created_at)}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 dark:text-white">
                  {formatDate(TypeR.updated_at)}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 dark:text-white">
                  {/* <button
                    onClick={() => onDelete(TypeR.id)}
                    className="bg-red-500 text-white font-semibold py-1 px-2 rounded transition duration-300"
                  >
                    Xóa
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="py-4 px-6 text-center text-sm font-medium text-gray-900 dark:text-white"
              >
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Trước
        </button>
        <span className="px-4 py-2 bg-white border rounded-lg">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white"
          }`}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default TypeRoomList;

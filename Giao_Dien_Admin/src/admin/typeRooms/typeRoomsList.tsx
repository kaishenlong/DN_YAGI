import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns"; // Import date-fns
import { TypeRoomCT } from "../../context/typeRoom";
import { IType_Room } from "../../interface/rooms";

const TypeRoomList = () => {
  const { types, onDelete } = useContext(TypeRoomCT);

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), "dd/MM/yyyy");
    } catch (error) {
      console.error("Invalid date format:", date);
      return date; // Trả về ngày gốc nếu lỗi
    }
  };

  return (
    <div className="p-4 xl:mr-100 bg-white shadow-md rounded-lg">
      <nav className="block w-full max-w-full bg-white text-gray-800 shadow-sm rounded-xl transition-all px-4 py-2">
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="capitalize">
            <nav aria-label="breadcrumb" className="w-max">
              <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-white p-2 transition-all">
                <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                  <a href="#">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                      dashboard
                    </p>
                  </a>
                  <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                    /
                  </span>
                </li>
                <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                    Loại Phòng
                  </p>
                </li>
              </ol>
            </nav>
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">
              Quản Lý Loại Phòng
            </h6>
          </div>
        </div>
      </nav>
      <div className="flex justify-between mt-4">
        <Link
          to={"addtype"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Thêm Loại Phòng
        </Link>
      </div>
      {/* ... */}
      <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 mt-4">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
              STT
            </th>
            <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
              Loại Phòng
            </th>
            <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
              Giường
            </th>
            <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
              Ngày Tạo
            </th>
            <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
              Ngày Cập Nhật
            </th>
            <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
              Chức Năng
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {types && types.length > 0 ? (
            types.map((TypeR: IType_Room, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {TypeR.type_room}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {TypeR.bed}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatDate(TypeR.created_at)}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatDate(TypeR.updated_at)}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <button
                    onClick={() => onDelete(TypeR.id)}
                    className="bg-red-500 text-white font-semibold py-1 px-2 rounded transition duration-300"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="py-4 px-6 text-center text-sm font-medium text-gray-900 dark:text-white"
              >
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TypeRoomList;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CitiesCT } from "../../context/cities";
import { ICities } from "../../interface/hotel";
import { format } from "date-fns"; // Import date-fns

const CitiesList = () => {
  const { cities, onDelete } = useContext(CitiesCT);

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), "dd/MM/yyyy");
    } catch (error) {
      console.error("Invalid date format:", date);
      return date; // Trả về ngày gốc nếu lỗi
    }
  };

  return (
    <div className="p-4 xl:ml-80">
      <div className="flex justify-between">
        <Link
          to={"add"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Add cities
        </Link>
      </div>
      {/* ... */}
      <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
              STT
            </th>
            <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
              Cities Name
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
          {cities && cities.length > 0 ? (
            cities.map((city: ICities, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {city.name}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatDate(city.created_at)}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatDate(city.updated_at)}
                </td>
                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <button
                    onClick={() => onDelete(city.id)}
                    className="bg-red-500 text-white font-semibold py-1 px-2 rounded"
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

export default CitiesList;

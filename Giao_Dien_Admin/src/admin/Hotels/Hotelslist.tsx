import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { hotelCT } from "../../context/hotel";
import { ICities, IHotel } from "../../interface/hotel";
import { format } from "date-fns";
import { getallCitys } from "../../services/cities";

const Hotellist = () => {
  const { hotels, onDelete } = useContext(hotelCT);
  const [city, setCity] = useState<ICities[]>([]);

  if (!hotels) return <div>Loading...</div>;

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), "dd/MM/yyyy");
    } catch (error) {
      console.error("Invalid date format:", date);
      return date;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getallCitys();
        console.log("Dữ liệu thành phố đã lấy:", data);
        setCity(data.data);
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu thành phố");
      }
    })();
  }, []);

  return (
    <div>
      <div className="mt-4 ml-6">
        <nav>
          <Link to="/dashboard" className="text-blue-900 hover:text-blue-500">
            Dashboard
          </Link>
        </nav>
        <h1 className="text-gray-900 text-xl font-semibold">Hotel List</h1>
      </div>
      <div className="mt-4 w-full max-w-screen-xl  overflow-x-auto">
        <div className="mb-4 grid grid-cols-1 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between mb-4">
              <Link
                to="add"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Add Hotel
              </Link>
              <Link
                to="/dashboard/cities"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Category List
              </Link>
            </div>

            <div className=" overflow-x-auto rounded-xl">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-xs font-medium  text-gray-700 uppercase dark:text-gray-400">
                      #
                    </th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Hotel Name
                    </th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Thành Phố
                    </th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Status
                    </th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Image
                    </th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Địa Chỉ
                    </th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Bản Đồ
                    </th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Email
                    </th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Phone
                    </th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Description
                    </th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Ngày tạo
                    </th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Ngày cập nhật
                    </th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {hotels.length > 0 ? (
                    hotels.map((hotel: IHotel, index: number) => (
                      <tr key={hotel.id} className=" hover:bg-gray-600 ">
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {hotel.name}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {city.find((city) => city.id === hotel.city_id)
                            ?.name || "Unknown"}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {hotel.status}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {hotel.image ? (
                            <img
                              src={`http://localhost:8000/storage/${hotel.image}`}
                              alt={hotel.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          ) : (
                            "Ảnh không có sẵn"
                          )}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {hotel.address}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {hotel.map}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {hotel.email}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {hotel.phone}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {hotel.description}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {formatDate(hotel.created_at)}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {formatDate(hotel.updated_at)}
                        </td>
                        <td className="py-6 px-4 flex justify-center gap-2">
                          <Link
                            to={`/dashboard/hotels/editHotel/${hotel.id}`}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-lg transition"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => onDelete(hotel.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-lg transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={12}
                        className="text-center py-4 text-sm font-medium text-gray-400"
                      >
                        No Hotels Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotellist;

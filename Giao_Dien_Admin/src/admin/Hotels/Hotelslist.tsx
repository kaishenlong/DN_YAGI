import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { hotelCT } from "../../context/hotel";
import { IHotel } from "../../interface/hotel";
// import AddHotels from "./addHotel";
import { format } from "date-fns";

const Hotellist = () => {
  const { hotels, onDelete } = useContext(hotelCT);

  if (!hotels) {
    // Optionally, you can render a loading indicator here
    return <div>Loading...</div>;
  }
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
      <nav className="w-full bg-transparent text-white shadow-none rounded-xl px-0 py-1">
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="capitalize">
            <nav aria-label="breadcrumb" className="w-max">
              <ol className="flex items-center p-0">
                <li className="flex items-center">
                  <Link
                    to="/dashboard"
                    className="text-blue-900 hover:text-blue-500"
                  >
                    Dashboard
                  </Link>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-blue-gray-900">Hotels</li>
              </ol>
            </nav>
            <h6 className="text-gray-900 font-semibold">Hotel List</h6>
          </div>
        </div>
      </nav>

      <div className="mt-12 w-[1700px]">
        <div className="mb-4 grid grid-cols-1 gap-6 2xl:grid-cols-3">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between">
              <Link
                to={"add"}
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

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      #
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Hotel Name
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Status
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Image
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Email
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Phone
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Description
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      ngày tạo
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      ngày cập nhật
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hotels.length > 0 ? (
                    hotels.map((hotel: IHotel, index: number) => (
                      <tr key={hotel.id} className="hover:bg-gray-100">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {hotel.name}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {hotel.status}
                        </td>
                        <td className="py-4 px-6">
                          {hotel.image ? (
                            <img
                              src={`http://localhost:8000/storage/${hotel.image}`}
                              alt={hotel.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          ) : (
                            <span>No Image</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {hotel.email}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {hotel.phone}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {hotel.description}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {formatDate(hotel.created_at)}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {formatDate(hotel.updated_at)}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium">
                          <Link
                            to={`/dashboard/hotels/editHotel/${hotel.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => onDelete(hotel.id)}
                            className="text-red-600 ml-4 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-4 px-6 text-sm font-medium text-gray-900"
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

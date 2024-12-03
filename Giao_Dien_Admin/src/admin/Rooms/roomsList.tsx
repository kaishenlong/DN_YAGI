import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { IRoomsDetail, IType_Room } from "../../interface/rooms";
import { getallTypeRoom } from "../../services/typeRoom";
import { IHotel } from "../../interface/hotel";
import { getallHotels } from "../../services/hotel";
import { roomCT } from "../../context/room";

const Roomlist = () => {
  const { rooms, onDelete } = useContext(roomCT);
  const [types, setType] = useState<IType_Room[]>([]);
  const [hotels, setHotels] = useState<IHotel[]>([]);
  console.log(rooms);

  if (!rooms) return <div>Loading...</div>;

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
        const data = await getallTypeRoom();
        console.log("Dữ liệu kiểu phòng đã lấy:", data);
        setType(data.data);
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu kiểu phòng");
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const data = await getallHotels();
        console.log("Dữ liệu hotel đã lấy:", data);
        setHotels(data.data);
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu hotel");
      }
    })();
  }, []);

  return (
    <div>
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
                to="addRoom"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Add Rooms
              </Link>
              <Link
                to="/dashboard/rooms/typeroom"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Type Room List
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
                      Type Room
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Hotel
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Image
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Price
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Price Surcharge
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Available
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Description
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                      Into Money
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
                  {rooms.length > 0 ? (
                    rooms.map((room: IRoomsDetail, index: number) => (
                      <tr key={room.id} className="hover:bg-gray-100">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {types.find((TypeR) => TypeR.id === room.room_id)
                            ?.type_room || "Unknown Type Room"}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {hotels.find((hotel) => hotel.id === room.hotel_id)
                            ?.name || "Unknown hotel"}
                        </td>
                        <td className="py-4 px-6">
                          {room.image ? (
                            <img
                              src={`http://localhost:8000/storage/${room.image}`}
                              alt={room.available}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          ) : (
                            <span>Ảnh không có sẵn</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {room.price}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {room.price_surcharge}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {room.available}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {room.description}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {room.into_money}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {formatDate(room.created_at)}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {formatDate(room.updated_at)}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium">
                          <Link
                            to={`/dashboard/rooms/editroom/${room.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => onDelete(room.id)}
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

export default Roomlist;

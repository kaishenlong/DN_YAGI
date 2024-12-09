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
    <div className="">
      <div className="mt-4 ml-6">
        <nav>
          <Link to="/dashboard" className="text-blue-900 hover:text-blue-500">
            Dashboard
          </Link>
        </nav>
        <h1 className="text-gray-900 text-xl font-semibold">Room List</h1>
      </div>

      <div className="mt-4 w-full max-w-screen-xl">
        <div className="mb-4 grid grid-cols-1 gap-6 ">
          <div className="bg-white  p-6">
            <div className="flex justify-between  mb-4">
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

            <div className="overflow-x-auto rounded-xl">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      #
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Type Room
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Hotel
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Image
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Price
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Price Surcharge
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Available
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Description
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Into Money
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      ngày tạo
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      ngày cập nhật
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {rooms.length > 0 ? (
                    rooms.map((room: IRoomsDetail, index: number) => (
                      <tr key={room.id} className="hover:bg-gray-600">
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {types.find((TypeR) => TypeR.id === room.room_id)
                            ?.type_room || "Unknown Type Room"}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {room.price}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {room.price_surcharge}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {room.available}
                        </td>
                        <td className="py-4 px-6  text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {room.description}
                        </td>

                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {room.into_money}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {formatDate(room.created_at)}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {formatDate(room.updated_at)}
                        </td>
                        <td className="py-6 px-4 flex justify-center gap-2">
                          <Link
                            to={`/dashboard/rooms/editroom/${room.id}`}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-lg transition"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => onDelete(room.id)}
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
                        colSpan={8}
                        className="text-center py-4 px-6 text-sm  font-medium text-gray-900 whitespace-nowrap dark:text-white"
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

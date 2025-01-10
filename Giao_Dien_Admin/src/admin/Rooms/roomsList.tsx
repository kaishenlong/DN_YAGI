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

  if (!rooms) return <div>Đang tải...</div>;

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), "dd/MM/yyyy");
    } catch (error) {
      console.error("Định dạng ngày không hợp lệ:", date);
      return date;
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString() + " VNĐ";
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
                    Phòng
                  </p>
                </li>
              </ol>
            </nav>
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">
              Quản Lý Phòng
            </h6>
          </div>
        </div>
      </nav>

      <div className="mt-4 w-full max-w-screen-xl">
        <div className="mb-4 grid grid-cols-1 gap-6 ">
          <div className="bg-white  p-6">
            <div className="flex justify-between  mb-4">
              <Link
                to="addRoom"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Thêm Phòng
              </Link>
              <Link
                to="/dashboard/rooms/typeroom"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Danh sách Kiểu Phòng
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
                      Kiểu Phòng
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Khách sạn
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Hình ảnh
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Giá
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Phụ thu
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Có sẵn
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Mô tả
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Tiền vào
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      ngày tạo
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      ngày cập nhật
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase dark:text-gray-400">
                      Hành động
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
                            ?.type_room || "Kiểu Phòng Không Xác Định"}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {hotels.find((hotel) => hotel.id === room.hotel_id)
                            ?.name || "Khách sạn Không Xác Định"}
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
                          {formatPrice(room.price)}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {formatPrice(room.price_surcharge)}
                        </td>
                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {room.available}
                        </td>
                        <td className="py-4 px-6  text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {room.description}
                        </td>

                        <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {formatPrice(room.into_money)}
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
                            Sửa
                          </Link>
                          <button
                            onClick={() => onDelete(room.id)}
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
                        colSpan={8}
                        className="text-center py-4 px-6 text-sm  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Không có phòng nào có sẵn
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

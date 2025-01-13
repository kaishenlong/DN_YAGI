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

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Số phòng hiển thị trên mỗi trang

  const totalPages = Math.ceil(rooms.length / itemsPerPage);

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), "dd/MM/yyyy");
    } catch (error) {
      console.error("Định dạng ngày không hợp lệ:", date);
      return date;
    }
  };

  // const formatPrice = (price: number) => {
  //   return price.toLocaleString() + " VNĐ";
  // };

  useEffect(() => {
    (async () => {
      try {
        const data = await getallTypeRoom();
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
        setHotels(data.data);
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu hotel");
      }
    })();
  }, []);

  // Lấy danh sách phòng theo trang hiện tại
  const currentRooms = rooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Xử lý khi chuyển trang
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6 bg-gray-50 shadow-lg rounded-lg">
      <nav className="block w-full bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link to="#" className="hover:text-blue-500">
                  Dashboard
                </Link>
              </li>
              <li>/</li>
              <li>Phòng</li>
            </ol>
            <h1 className="text-lg font-bold text-gray-800 mt-2">
              Quản Lý Phòng
            </h1>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              to="addRoom"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
            >
              Thêm Phòng
            </Link>
            <Link
              to="/dashboard/rooms/typeroom"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
            >
              Danh sách Kiểu Phòng
            </Link>
          </div>
        </div>
      </nav>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow rounded-lg">
          <thead className="bg-blue-50">
            <tr>
              {[
                "#",
                "Kiểu Phòng",
                "Khách Sạn",
                "Hình Ảnh",
                "Giá",
                "Phụ Thu",
                "Có Sẵn",
                "Mô Tả",
                "Tiền Vào",
                "Ngày Tạo",
                "Ngày Cập Nhật",
                "Hành Động",
              ].map((header) => (
                <th
                  key={header}
                  className="text-left py-3 px-4 text-sm font-semibold text-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRooms.length > 0 ? (
              currentRooms.map((room: IRoomsDetail, index: number) => (
                <tr key={room.id} className="hover:bg-gray-100">
                  <td className="py-4 px-4 text-sm text-gray-800">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-800">
                    {types.find((TypeR) => TypeR.id === room.room_id)
                      ?.type_room || "Không xác định"}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-800">
                    {hotels.find((hotel) => hotel.id === room.hotel_id)?.name ||
                      "Không xác định"}
                  </td>
                  <td className="py-4 px-4">
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
                  <td className="py-4 px-4 text-sm text-gray-800">
                    {Number(room.price).toLocaleString()} VND
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-800">
                    {Number(room.price_surcharge).toLocaleString()} VND
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-800">
                    {room.available}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-800">
                    {room.description}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-800">
                    {Number(room.into_money).toLocaleString()} VND
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-800">
                    {formatDate(room.created_at)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-800">
                    {formatDate(room.updated_at)}
                  </td>
                  <td className="py-4 px-4 flex gap-2">
                    <Link
                      to={`/dashboard/rooms/editroom/${room.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-2 rounded-lg"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => onDelete(room.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-2 rounded-lg"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={12}
                  className="text-center py-4 text-gray-600 text-sm font-medium"
                >
                  Không có phòng nào có sẵn
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Điều hướng phân trang */}
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

export default Roomlist;

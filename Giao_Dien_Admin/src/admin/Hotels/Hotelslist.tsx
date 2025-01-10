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
    <div className="hotels-list-container bg-gray-50 p-6 rounded-lg shadow-lg mt-6">
      <nav className="hotels-list-nav mb-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="capitalize">
            <nav aria-label="breadcrumb">
              <ol className="flex items-center text-sm text-gray-600 space-x-2">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Dashboard
                  </a>
                  <span>/</span>
                </li>
                <li>Quản Lý Thành Phố</li>
              </ol>
            </nav>
            <h6 className="text-lg font-semibold text-gray-800">
              Danh Sách Khách Sạn
            </h6>
          </div>
          <div className="flex gap-4">
            <Link
              to="add"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
            >
              Thêm Khách Sạn
            </Link>
            <Link
              to="/dashboard/cities"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
            >
              Danh Sách Thành Phố
            </Link>
          </div>
        </div>
      </nav>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "STT",
                "Tên Khách Sạn",
                "Thành Phố",
                "Trạng Thái",
                "Hình Ảnh",
                "Địa Chỉ",
                "Bản Đồ",
                "Email",
                "Số Điện Thoại",
                "Mô Tả",
                "Ngày Tạo",
                "Ngày Cập Nhật",
                "Hành Động",
              ].map((header) => (
                <th
                  key={header}
                  className="py-3 px-4 text-xs font-medium text-gray-700 uppercase text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {hotels.length > 0 ? (
              hotels.map((hotel: IHotel, index: number) => (
                <tr key={hotel.id} className="hover:bg-gray-100">
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4">{hotel.name}</td>
                  <td className="py-4 px-4">
                    {city.find((c) => c.id === hotel.city_id)?.name ||
                      "Không rõ"}
                  </td>
                  <td className="py-4 px-4">{hotel.status}</td>
                  <td className="py-4 px-4">
                    {hotel.image ? (
                      <img
                        src={`http://localhost:8000/storage/${hotel.image}`}
                        alt={hotel.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      "Không có ảnh"
                    )}
                  </td>
                  <td className="py-4 px-4">{hotel.address}</td>
                  <td className="py-4 px-4">{hotel.map}</td>
                  <td className="py-4 px-4">{hotel.email}</td>
                  <td className="py-4 px-4">{hotel.phone}</td>
                  <td className="py-4 px-4">{hotel.description}</td>
                  <td className="py-4 px-4">{formatDate(hotel.created_at)}</td>
                  <td className="py-4 px-4">{formatDate(hotel.updated_at)}</td>
                  <td className="py-4 px-4 flex gap-2">
                    <Link
                      to={`/dashboard/hotels/editHotel/${hotel.id}`}
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => onDelete(hotel.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 transition"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13} className="py-4 text-center text-gray-500">
                  Không có khách sạn nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hotellist;

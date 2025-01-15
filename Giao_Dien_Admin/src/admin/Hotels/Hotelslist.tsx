import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { hotelCT } from "../../context/hotel";
import { ICities, IHotel } from "../../interface/hotel";
import { format } from "date-fns";
import { getallCitys } from "../../services/cities";

const Hotellist = () => {
  const { hotels, onDelete } = useContext(hotelCT);
  const [city, setCity] = useState<ICities[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState<IHotel | null>(null);
  const itemsPerPage = 20;

  if (!hotels) return <div>Loading...</div>;

  const totalPages = Math.ceil(hotels.length / itemsPerPage);

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

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedHotels = hotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleShowModal = (hotel: IHotel) => {
    setSelectedHotel(hotel);
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
  };

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
                "Hình Ảnh",
                "Hành Động",
                "Chức Năng",
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
            {paginatedHotels.length > 0 ? (
              paginatedHotels.map((hotel: IHotel, index: number) => (
                <tr key={hotel.id} className="hover:bg-gray-100">
                  <td className="py-4 px-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-4 px-4">{hotel.name}</td>
                  <td className="py-4 px-4">
                    {city.find((c) => c.id === hotel.city_id)?.name ||
                      "Không rõ"}
                  </td>
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
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleShowModal(hotel)}
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition"
                    >
                      Xem thêm
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/hotels/editHotel/${hotel.id}`}
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition"
                    >
                      Sửa
                    </Link>
                    {/* <button
                      onClick={() => onDelete(hotel.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 transition"
                    >
                      Xóa
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  Không có khách sạn nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

      {/* Modal chi tiết */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-xl">
            <h3 className="text-lg font-semibold mb-4">
              Chi Tiết Khách Sạn: {selectedHotel.name}
            </h3>
            <p>
              <strong>Bản Đồ:</strong> {selectedHotel.map}
            </p>
            <p>
              <strong>Trạng Thái:</strong> {selectedHotel.status}
            </p>
            <p>
              <strong>Email:</strong> {selectedHotel.email}
            </p>
            <p>
              <strong>Số Điện Thoại:</strong> {selectedHotel.phone}
            </p>
            <p>
              <strong>Mô Tả:</strong> {selectedHotel.description}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotellist;

import React, { useContext, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { DashboardCT } from "../context/dashboard";
import {
  DoanhThu7Ngay,
  DoanhThuCacThangTrongNam,
  DoanhThuTheoThang,
  ThongKeChiNhanh,
  ThongKeKhachHang,
  ThongKeTongQuan
} from "../interface/dashboard";
import { getallDashboard } from "../services/dashboard";
import { useEffect } from "react";


const StatisticsDashboard = () => {
  // const { dashboard } = useContext(DashboardCT); // Dữ liệu từ context
  // const [selectedMenu, setSelectedMenu] = useState("tongQuan"); // Trạng thái menu
  const { dashboard, handleFilterSubmit } = useContext(DashboardCT);
  const [selectedMenu, setSelectedMenu] = useState("tongQuan");
  const [selectedCustomer, setSelectedCustomer] =
    useState<ThongKeKhachHang | null>(null); // Trạng thái khách hàng được chọn
  const [visibleColumns, setVisibleColumns] = useState([
    true,
    true,
    true,
    true,
  ]); // Trạng thái các cột

  if (!dashboard) return <p>Đang tải dữ liệu...</p>;

  const {
    thongKeTongQuan,
    thongKeChiNhanh,
    doanhThu7Ngay,
    doanhThuTheoThang,
    doanhThuCacThangTrongNam,
    thongKeKhachHang,
  } = dashboard;



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const start_date = formData.get("start_date")?.toString() || "00001-01-01";
    const end_date = formData.get("end_date")?.toString() || "9999-12-31";
    handleFilterSubmit(start_date, end_date);
  };

  if (!dashboard) return <p>Đang tải dữ liệu...</p>;



  // Thêm các state cho phân trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 3; // Số lượng chi nhánh hiển thị mỗi trang

  const [currentPagethongKeKhachHang, setCurrentPagethongKeKhachHang] = useState(1); // Trang hiện tại
  const itemsPerPagethongKeKhachHang = 6; // Số lượng chi nhánh hiển thị mỗi trang

  if (!dashboard) return <p>Đang tải dữ liệu...</p>;



  // Tính toán dữ liệu phân trang
  const totalPages = Array.isArray(thongKeChiNhanh)
    ? Math.ceil(thongKeChiNhanh.length / itemsPerPage)
    : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = Array.isArray(thongKeChiNhanh)
    ? thongKeChiNhanh.slice(startIndex, startIndex + itemsPerPage)
    : [];

  // Tính toán dữ liệu phân trang
  const totalPagesthongKeKhachHang = Array.isArray(thongKeKhachHang)
    ? Math.ceil(thongKeKhachHang.length / itemsPerPagethongKeKhachHang)
    : 0;
  const startIndexthongKeKhachHang = (currentPagethongKeKhachHang - 1) * itemsPerPagethongKeKhachHang;
  const currentItemsthongKeKhachHang = Array.isArray(thongKeKhachHang)
    ? thongKeKhachHang.slice(startIndexthongKeKhachHang, startIndexthongKeKhachHang + itemsPerPagethongKeKhachHang)
    : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePageChangethongKeKhachHang = (page: number) => {
    setCurrentPagethongKeKhachHang(page);
  };

  // Dữ liệu biểu đồ tổng quan
  const dataTongQuan = {
    labels: ["Doanh thu", "Đơn xác nhận", "Đơn đặt phòng", "Đơn hủy"],
    datasets: [
      {
        label: "Thống kê tổng quan",
        data: [
          parseFloat(thongKeTongQuan?.tong_doanh_thu || "0"),
          thongKeTongQuan?.tong_don_xac_nhan || 0,
          parseFloat(thongKeTongQuan?.tong_don_dat_phong || "0"),
          thongKeTongQuan?.tong_don_huy || 0,
        ],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f1c40f"],
      },
    ],
  };

  // Dữ liệu biểu đồ doanh thu 7 ngày
  const dataDoanhThu7Ngay = {
    labels:
      doanhThu7Ngay && doanhThu7Ngay.length > 0
        ? doanhThu7Ngay.map((item: DoanhThu7Ngay) => item.ngay)
        : [],
    datasets: [
      {
        label: "Doanh thu 7 ngày gần đây",
        data:
          doanhThu7Ngay && doanhThu7Ngay.length > 0
            ? doanhThu7Ngay.map((item: DoanhThu7Ngay) =>
              parseFloat(item.doanh_thu)
            )
            : [],
        backgroundColor: "#3498db",
      },
    ],
  };

  // Dữ liệu biểu đồ doanh thu theo tháng
  const dataDoanhThuTheoThang = {
    labels:
      doanhThuTheoThang && doanhThuTheoThang.length > 0
        ? doanhThuTheoThang.map((item: DoanhThuTheoThang) => item.ngay)
        : [],
    datasets: [
      {
        label: "Doanh thu theo ngày trong tháng",
        data:
          doanhThuTheoThang && doanhThuTheoThang.length > 0
            ? doanhThuTheoThang.map((item: DoanhThuTheoThang) =>
              parseFloat(item.doanh_thu)
            )
            : [],
        backgroundColor: "#2ecc71",
      },
    ],
  };

  // Dữ liệu biểu đồ doanh thu các tháng trong năm
  const dataDoanhThuCacThang = {
    labels:
      doanhThuCacThangTrongNam && doanhThuCacThangTrongNam.length > 0
        ? doanhThuCacThangTrongNam.map(
          (item: DoanhThuCacThangTrongNam) => `Tháng ${item.thang}`
        )
        : [],
    datasets: [
      {
        label: "Doanh thu các tháng trong năm",
        data:
          doanhThuCacThangTrongNam && doanhThuCacThangTrongNam.length > 0
            ? doanhThuCacThangTrongNam.map((item: DoanhThuCacThangTrongNam) =>
              parseFloat(item.doanh_thu)
            )
            : [],
        backgroundColor: "#f1c40f",
      },
    ],
  };


  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <nav className="flex flex-col md:flex-row mb-2 md:items-center justify-between bg-white p-4 shadow-md rounded-lg">
        <div>
          <nav
            aria-label="breadcrumb"
            className="text-sm text-gray-500 flex items-center gap-2"
          >
            <a href="#" className="hover:text-blue-500">
              Dashboard
            </a>
            <span>/</span>
            <p className="font-semibold text-gray-800">Biểu đồ</p>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">
            Biểu đồ
          </h1>
        </div>
        <div className="mt-4 md:mt-0 flex justify-center">
          <form
            id="dateFilterForm"
            onSubmit={handleSubmit}
            className="bg-white p-3 rounded-lg shadow-md space-y-4 w-full max-w-full"
          >
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex flex-col">
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  // value={filters.start_date}
                  // onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
                  className="block w-48 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  // value={filters.end_date}
                  // onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
                  className="block w-48 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Lọc
                </button>
              </div>
            </div>
          </form>
        </div>
      </nav>
      {/* Menu lựa chọn */}
      <div className="flex gap-4 mb-4">
        {[
          { key: "tongQuan", label: "Thống kê tổng quan" },
          { key: "chiNhanh", label: "Thống kê chi nhánh" },
          { key: "doanhThu7Ngay", label: "Doanh thu 7 ngày" },
          { key: "doanhThuTheoThang", label: "Doanh thu theo tháng" },
          { key: "doanhThuCacThang", label: "Doanh thu các tháng" },
          { key: "khachHang", label: "Thống kê khách hàng" },
        ].map((menu) => (
          <button
            key={menu.key}
            onClick={() => setSelectedMenu(menu.key)}
            className={`px-4 py-2 rounded-lg font-small ${selectedMenu === menu.key
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
              }`}
          >
            {menu.label}
          </button>
        ))}
      </div>
      {/* Nội dung theo menu */}
      <div className="w-full max-w-6xl bg-white p-4 rounded-lg shadow-xl">
        {selectedMenu === "tongQuan" && (
          <>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              Thống kê tổng quan
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-green-100 shadow-md p-4 rounded-md text-center">
                <strong className="block text-gray-600">Tổng doanh thu</strong>
                <span className="text-xl font-bold text-green-800">
                  {thongKeTongQuan?.tong_doanh_thu || "0"}
                </span>
              </div>
              <div className="bg-blue-100 shadow-md p-4 rounded-md text-center">
                <strong className="block text-gray-600">Đánh giá trung bình</strong>
                <span className="text-xl font-bold text-blue-800">
                  {Math.round(thongKeTongQuan?.danh_gia_tb * 100) / 100 || "0"}
                </span>
              </div>
              <div className="bg-yellow-100 shadow-md p-4 rounded-md text-center">
                <strong className="block text-gray-600">Tổng đơn xác nhận</strong>
                <span className="text-xl font-bold text-yellow-800">
                  {thongKeTongQuan?.tong_don_xac_nhan || "0"}
                </span>
              </div>
              <div className="bg-indigo-100 shadow-md p-4 rounded-md text-center">
                <strong className="block text-gray-600">Tổng số khách đã đến</strong>
                <span className="text-xl font-bold text-indigo-800">
                  {thongKeTongQuan?.tong_so_khach_da_den || "0"}
                </span>
              </div>
              <div className="bg-teal-100 shadow-md p-4 rounded-md text-center">
                <strong className="block text-gray-600">Tổng đơn đặt phòng</strong>
                <span className="text-xl font-bold text-teal-800">
                  {thongKeTongQuan?.tong_don_dat_phong || "0"}
                </span>
              </div>
              <div className="bg-red-100 shadow-md p-4 rounded-md text-center">
                <strong className="block text-gray-600">Tổng đơn hủy</strong>
                <span className="text-xl font-bold text-red-800">
                  {thongKeTongQuan?.tong_don_huy || "0"}
                </span>
              </div>
              <div className="bg-orange-100 shadow-md p-4 rounded-md text-center">
                <strong className="block text-gray-600">Tỉ lệ hủy</strong>
                <span className="text-xl font-bold text-orange-800">
                  {Math.round(thongKeTongQuan?.ti_le_huy * 100) / 100 || "0"}%
                </span>
              </div>
              <div className="bg-purple-100 shadow-md p-4 rounded-md text-center">
                <strong className="block text-gray-600">Thanh toán thành công</strong>
                <span className="text-xl font-bold text-purple-800">
                  {thongKeTongQuan?.tong_so_thanh_toan_thanh_cong || "0"}
                </span>
              </div>
            </div>
          </>
        )}
        {selectedMenu === "chiNhanh" && (
          <>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              Thống kê chi nhánh
            </h3>
            <ul className="space-y-4">
              {currentItems.map((chiNhanh: ThongKeChiNhanh) => (
                <li
                  key={chiNhanh.hotel_id}
                  className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
                >
                  {/* Thông tin cơ bản */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {chiNhanh.ten_chi_nhanh}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500">ID: {chiNhanh.hotel_id}</p>
                  </div>
                  {/* Thông tin đặt phòng */}
                  <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <div className="bg-green-100 p-3 rounded-lg shadow-sm">
                      <p className="font-medium text-green-800">
                        <i className="fas fa-dollar-sign"></i> Tổng doanh thu:
                      </p>
                      <p className="text-lg font-bold">
                        {chiNhanh.tong_doanh_thu || "Chưa có dữ liệu"}
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg shadow-sm">
                      <p className="font-medium text-green-800">
                        <i className="fas fa-book-open"></i> Tổng đơn đặt phòng:
                      </p>
                      <p className="text-lg font-bold">{chiNhanh.tong_don_dat_phong || "Chưa có dữ liệu"}</p>
                    </div>

                    <div className="bg-red-100 p-3 rounded-lg shadow-sm">
                      <p className="font-medium text-red-800">
                        <i className="fas fa-times-circle"></i> Đơn hủy:
                      </p>
                      <p className="text-lg font-bold">{chiNhanh.don_huy || "Chưa có dữ liệu"}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg shadow-sm">
                      <p className="font-medium text-blue-800">
                        <i className="fas fa-percentage"></i> Tỉ lệ hủy:
                      </p>
                      <p className="text-lg font-bold">{Math.round(Number(chiNhanh.ti_le_huy)) || "Chưa có dữ liệu"}</p>
                    </div>
                  </div>
                  {/* Thông tin doanh thu và đánh giá */}
                  <div className="grid grid-cols-2 gap-4 text-gray-700 mt-4">
                    <div className="bg-purple-100 p-3 rounded-lg shadow-sm">
                      <p className="font-medium text-purple-800">
                        <i className="fas fa-money-bill-wave"></i> Thanh toán thành công:
                      </p>
                      <p className="text-lg font-bold">
                        {chiNhanh.thanh_toan_thanh_cong || "Chưa có dữ liệu"}
                      </p>
                    </div>
                    <div className="bg-teal-100 p-3 rounded-lg shadow-sm">
                      <p className="font-medium text-teal-800">
                        <i className="fas fa-star"></i> Đánh giá trung bình:
                      </p>
                      <p className="text-lg font-bold">{Math.round(Number(chiNhanh.danh_gia_tb) * 100) / 100 || "Chưa có dữ liệu"}</p>
                    </div>

                  </div>
                </li>
              ))}
            </ul>
            {/* Phân trang */}
            <div className="mt-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
        {selectedMenu === "doanhThu7Ngay" && (
          <>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              Doanh thu 7 ngày gần đây
            </h3>
            <div className="chart-container" style={{ height: "400px" }}>
              <Line
                data={dataDoanhThu7Ngay}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            </div>
          </>
        )}
        {selectedMenu === "doanhThuTheoThang" && (
          <>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              Doanh thu theo tháng
            </h3>
            <div className="chart-container" style={{ height: "400px" }}>
              <Bar
                data={dataDoanhThuTheoThang}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            </div>
          </>
        )}
        {selectedMenu === "doanhThuCacThang" && (
          <>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              Doanh thu các tháng trong năm
            </h3>
            <div className="chart-container" style={{ height: "400px" }}>
              <Line
                data={dataDoanhThuCacThang}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            </div>
          </>
        )}
        {selectedMenu === "khachHang" && (
          <>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              Thống kê khách hàng
            </h3>
            {selectedCustomer ? (
              <div className="space-y-8">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-blue-600 font-medium underline hover:text-blue-800 transition duration-300"
                >
                  ← Quay lại danh sách khách hàng
                </button>
                <div className="p-8 bg-white rounded-xl shadow-xl border border-gray-200">
                  <h4 className="text-2xl font-bold text-gray-700 mb-6">
                    Chi tiết khách hàng
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-700 text-lg">
                        <strong className="font-medium text-gray-600">Tên khách hàng:</strong>{" "}
                        {selectedCustomer.ten_khach_hang}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg">
                        <strong className="font-medium text-gray-600">ID khách hàng:</strong>{" "}
                        {selectedCustomer.id_khach_hang}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg">
                        <strong className="font-medium text-gray-600">Số lần đặt phòng:</strong>{" "}
                        {selectedCustomer.so_lan_dat_phong}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg">
                        <strong className="font-medium text-gray-600">Số lần đặt thành công:</strong>{" "}
                        {selectedCustomer.so_lan_dat_phong_thanh_cong}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg">
                        <strong className="font-medium text-gray-600">
                          Tỷ lệ đặt phòng thành công:
                        </strong>{" "}
                        {selectedCustomer.ty_le_dat_phong_thanh_cong}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg">
                        <strong className="font-medium text-gray-600">Tỷ lệ hủy đặt phòng:</strong>{" "}
                        {selectedCustomer.ty_le_huy_dat_phong}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg">
                        <strong className="font-medium text-gray-600">Tổng số ngày lưu trú:</strong>{" "}
                        {selectedCustomer.tong_so_ngay_luu_tru}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg">
                        <strong className="font-medium text-gray-600">Tổng chi tiêu:</strong>{" "}
                        {selectedCustomer.tong_chi_tieu} VND
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg">
                        <strong className="font-medium text-gray-600">Ngày đặt phòng gần nhất:</strong>{" "}
                        {selectedCustomer.ngay_dat_phong_gan_nhat}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItemsthongKeKhachHang.map((khachHang: ThongKeKhachHang, index: number) => (
                  <li
                    key={khachHang.id_khach_hang}
                    className="p-6 bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer hover:bg-blue-50 transition duration-300 transform hover:scale-105"
                    onClick={() => setSelectedCustomer(khachHang)}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-lg font-semibold text-blue-600 mr-3">
                        #{index + 1}
                      </span>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {khachHang.ten_khach_hang}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>ID:</strong> {khachHang.id_khach_hang}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Số lần đặt phòng:</strong> {khachHang.so_lan_dat_phong}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Số lần đặt thành công:</strong>{" "}
                      {khachHang.so_lan_dat_phong_thanh_cong}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Tổng chi tiêu:</strong> {khachHang.tong_chi_tieu} VND
                    </p>
                  </li>
                ))}
              </ul>

            
            )}
            <div className="mt-4 flex justify-center">
              {Array.from({ length: totalPagesthongKeKhachHang }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChangethongKeKhachHang(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-lg ${currentPagethongKeKhachHang === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatisticsDashboard;

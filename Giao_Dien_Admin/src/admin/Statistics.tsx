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
} from "../interface/dashboard";

const StatisticsDashboard = () => {
  const { dashboard } = useContext(DashboardCT); // Dữ liệu từ context
  const [selectedMenu, setSelectedMenu] = useState("tongQuan"); // Trạng thái menu
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

  // Hàm xử lý lọc cột theo màu
  const handleColumnToggle = (index: number) => {
    const updatedColumns = [...visibleColumns];
    updatedColumns[index] = !updatedColumns[index];
    setVisibleColumns(updatedColumns);
  };

  return (
    <div className="p-12 bg-gray-100 w-full min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold text-gray-700 mb-8">Bảng thống kê</h2>

      {/* Menu lựa chọn */}
      <div className="flex gap-4 mb-8">
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
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedMenu === menu.key
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {menu.label}
          </button>
        ))}
      </div>

      {/* Lọc cột theo màu */}
      {selectedMenu === "tongQuan" && (
        <div className="flex flex-wrap gap-4 mb-8">
          {["#3498db", "#2ecc71", "#e74c3c", "#f1c40f"].map((color, index) => (
            <button
              key={color}
              onClick={() => handleColumnToggle(index)}
              className="px-4 py-2 rounded-lg text-white font-bold transition-transform transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: color }}
            >
              {visibleColumns[index] ? "Ẩn" : "Hiện"} Cột {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Nội dung theo menu */}
      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-xl">
        {selectedMenu === "tongQuan" && (
          <>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              Thống kê tổng quan
            </h3>
            <div className="chart-container" style={{ height: "400px" }}>
              <Bar
                data={{
                  ...dataTongQuan,
                  datasets: [
                    {
                      ...dataTongQuan.datasets[0],
                      data: visibleColumns.map((visible, index) =>
                        visible ? dataTongQuan.datasets[0].data[index] : null
                      ),
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </>
        )}

        {selectedMenu === "chiNhanh" && (
          <>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              Thống kê chi nhánh
            </h3>
            <ul className="space-y-2">
              {thongKeChiNhanh.map((chiNhanh: ThongKeChiNhanh) => (
                <li
                  key={chiNhanh.hotel_id}
                  className="p-4 bg-gray-100 rounded-lg shadow-md"
                >
                  <p>
                    <strong>Chi nhánh:</strong> {chiNhanh.ten_chi_nhanh}
                  </p>
                  <p>
                    <strong>Doanh thu:</strong>{" "}
                    {chiNhanh.tong_doanh_thu || "Chưa có dữ liệu"}
                  </p>
                </li>
              ))}
            </ul>
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
              <div className="space-y-4">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-blue-500 underline hover:text-blue-700 transition duration-300"
                >
                  Quay lại danh sách khách hàng
                </button>
                <p className="text-gray-800 font-medium">
                  <strong className="text-gray-700">Tên khách hàng:</strong>{" "}
                  {selectedCustomer.ten_khach_hang}
                </p>
                <p className="text-gray-800 font-medium">
                  <strong className="text-gray-700">Tổng chi tiêu:</strong>{" "}
                  {selectedCustomer.tong_chi_tieu} VND
                </p>
                <p className="text-gray-800 font-medium">
                  <strong className="text-gray-700">
                    Ngày đặt phòng gần nhất:
                  </strong>{" "}
                  {selectedCustomer.ngay_dat_phong_gan_nhat}
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {thongKeKhachHang.map((khachHang: ThongKeKhachHang) => (
                  <li
                    key={khachHang.id_khach_hang}
                    className="p-6 bg-gray-50 rounded-lg shadow-md cursor-pointer hover:bg-blue-100 transition-colors duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => setSelectedCustomer(khachHang)}
                  >
                    <strong className="text-gray-800 text-lg">
                      {khachHang.ten_khach_hang}
                    </strong>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StatisticsDashboard;

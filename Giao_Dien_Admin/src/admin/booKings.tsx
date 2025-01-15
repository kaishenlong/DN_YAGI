import React, { useContext, useState, useEffect } from "react";
import { PaymentCT } from "../context/payment";
import {
  IPayment,
  PaymentDetail,
  StatusBooking,
  StatusPayment,
} from "../interface/booking";
import { UserCT } from "../context/user";
import { getDetailPaymentbyId, UpdatestatusBooking } from "../services/booking";
import { ServiceCT } from "../context/serviceCT";
import { Iservice } from "../interface/service";

type Props = {};

const Bookings = (props: Props) => {
  const { payment, onUpdateStatus, loadingPaymentId } = useContext(PaymentCT);
  // const { loadingBookingId } = useContext(BookingCT);
  const { users } = useContext(UserCT);
  const { services } = useContext(ServiceCT);

  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState<
    PaymentDetail[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Số phòng hiển thị trên mỗi trang
  //update status booking
  const [loadingBookingId, setLoadingBookingIdBooking] = useState<
    number | null
  >(null);
  //modal status booking
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  //totalpage
  const totalPages = Math.ceil(payment.length / itemsPerPage);
  //service
  // const [selectedServices, setSelectedServices] = useState<Iservice[]>([]);

  // Fetch payment and booking details
  const handleShowModal = async (payment: IPayment) => {
    setShowModal(true);
    setLoading(true);

    try {
      // Fetch toàn bộ chi tiết thanh toán theo ID
      const paymentDetailData = await getDetailPaymentbyId(payment.id);

      if (paymentDetailData.data && paymentDetailData.data.length > 0) {
        setSelectedPaymentDetail(paymentDetailData.data); // Lưu toàn bộ danh sách PaymentDetail
        setError(null);
      } else {
        setError("Không tìm thấy chi tiết thanh toán.");
      }
    } catch (error) {
      setError("Không thể lấy chi tiết thanh toán.");
    } finally {
      setLoading(false);
    }
  };
  const handleServiceSelection = (serviceId: number) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        // Nếu serviceId đã có trong mảng, bỏ chọn (loại bỏ serviceId)
        return prev.filter((id) => id !== serviceId);
      } else {
        // Nếu serviceId chưa có trong mảng, chọn dịch vụ (thêm serviceId vào mảng)
        return [...prev, serviceId];
      }
    });
  };

  const onUpdateStatusBooking = async (
    bookingId: number,
    currentStatus: StatusBooking
  ) => {
    // Hàm hiển thị modal xác nhận
    const handleShowConfirmModal = () => {
      setShowConfirmModal(true);
    };

    // 1. Kiểm tra nếu không có chi tiết thanh toán, không làm gì
    if (!selectedPaymentDetail) return;

    setLoadingBookingIdBooking(bookingId); // 2. Đặt trạng thái loading cho booking đang xử lý

    let newStatus: StatusBooking;

    // 3. Xác định trạng thái mới dựa trên trạng thái hiện tại
    if (currentStatus === StatusBooking.PENDING) {
      newStatus = StatusBooking.CHECKIN;
    } else if (currentStatus === StatusBooking.CHECKIN) {
      handleShowConfirmModal();
      newStatus = StatusBooking.CHECKOUT;
    } else {
      return; // 4. Nếu trạng thái hiện tại không phải PENDING hoặc CHECKIN, không thay đổi
    }

    try {
      // 5. Gọi API cập nhật trạng thái booking với các dịch vụ đã chọn
      await UpdatestatusBooking(bookingId, {
        status: newStatus,
        services: selectedServices, // Truyền selectedServices vào đây
      });

      // 6. Sau khi cập nhật trạng thái, làm mới lại chi tiết thanh toán
      const updatedPaymentDetail = await getDetailPaymentbyId(
        selectedPaymentDetail[0].payment.id // Lấy ID thanh toán từ chi tiết thanh toán hiện tại
      );

      // 7. Kiểm tra dữ liệu trả về từ API, nếu có thì cập nhật lại selectedPaymentDetail
      if (updatedPaymentDetail.data && updatedPaymentDetail.data.length > 0) {
        setSelectedPaymentDetail(updatedPaymentDetail.data); // 8. Làm mới danh sách chi tiết thanh toán
      } else {
        console.warn("Không thể lấy lại chi tiết thanh toán sau khi cập nhật.");
      }
    } catch (error) {
      // 9. Xử lý lỗi nếu có
      console.error("Lỗi khi cập nhật trạng thái:", error);
    } finally {
      // 10. Sau khi xong, set lại loadingBookingIdBooking về null
      setLoadingBookingIdBooking(null);
    }
  };

  // Hàm đóng modal xác nhận
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPaymentDetail(null);
  };

  // useEffect(() => {
  //   if (selectedPaymentDetail) {
  //     console.log("Chi tiết thanh toán:", selectedPaymentDetail);
  //     console.log(
  //       "Chi tiết thanh toán - Payment:",
  //       selectedPaymentDetail[0]?.payment
  //     );
  //     console.log(
  //       "Chi tiết thanh toán - Booking:",
  //       selectedPaymentDetail[0]?.booking
  //     );
  //   }
  // }, [selectedPaymentDetail]);
  // Lấy danh sách payment theo trang hiện tại
  const currentRooms = payment.slice(
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
    <div className="p-4 xl:mr-100 bg-gray-100 rounded-lg shadow-md mt-[20px]">
      {/* Header */}
      <nav className="block w-full max-w-full bg-white text-gray-800 shadow-sm rounded-xl transition-all px-4 py-2">
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="capitalize">
            <nav aria-label="breadcrumb" className="w-max">
              <ol className="flex flex-wrap items-center bg-white p-2 rounded-md">
                <li className="text-gray-700">
                  <a href="#" className="hover:text-blue-500">
                    Dashboard
                  </a>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-blue-500 font-semibold">
                  Quản lý Đặt phòng
                </li>
              </ol>
            </nav>
            <h6 className="text-base font-semibold">Quản lý Đặt phòng</h6>
          </div>
        </div>
      </nav>

      {/* Table */}
      <div className="mt-12">
        <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                    STT
                  </th>
                  <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                    Tên Khách hàng
                  </th>
                  <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                    Ngày Thanh toán
                  </th>
                  <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                    Phương thức
                  </th>
                  <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                    Số tiền
                  </th>
                  <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                    Trạng thái
                  </th>
                  <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentRooms.map((pay: IPayment, index: number) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-4 px-6 text-sm">{index + 1}</td>
                    <td className="py-4 px-6 text-sm">
                      {users.find((u) => u.id === pay.user_id)?.name ||
                        "Không rõ"}
                    </td>
                    <td className="py-4 px-6 text-sm">{pay.paymen_date}</td>
                    <td className="py-4 px-6 text-sm">{pay.method}</td>
                    <td className="py-4 px-6 text-sm">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(Number(pay.total_amount))}
                    </td>
                    <td
                      className="py-4 px-6 text-sm cursor-pointer"
                      style={{ color: getStatusColor(pay.status) }}
                      onClick={() => onUpdateStatus(pay.id, pay.status)}
                    >
                      {loadingPaymentId === pay.id ? (
                        <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">
                          Đang chuyển...
                        </button>
                      ) : (
                        <button
                          className={`bg-${getStatusColor(
                            pay.status
                          )}-500 text-white py-2 px-4 rounded hover:bg-${getStatusColor(
                            pay.status
                          )}-700`}
                          onClick={() => onUpdateStatus(pay.id, pay.status)}
                        >
                          {pay.status}
                        </button>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleShowModal(pay)}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedPaymentDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-[700px]">
            {/* Header */}
            <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-t-lg">
              <h3 className="text-lg font-semibold">Chi tiết Thanh toán</h3>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-gray-300 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Payment Info */}
              <h4 className="text-md font-semibold mb-4">
                Thông tin Thanh toán
              </h4>
              <p>
                <strong>Khách hàng:</strong>{" "}
                {selectedPaymentDetail[0]?.payment.firstname}{" "}
                {selectedPaymentDetail[0]?.payment.lastname}
              </p>
              <p>
                <strong>Phương thức:</strong>{" "}
                {selectedPaymentDetail[0]?.payment.method}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {selectedPaymentDetail[0]?.payment.status}
              </p>

              {/* Booking List */}
              <h4 className="text-md font-semibold mt-6 mb-4">
                Danh sách Phòng
              </h4>
              <div className="border-t pt-4 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {selectedPaymentDetail.map(
                  (detail: PaymentDetail, index: number) => (
                    <div
                      key={index}
                      className="mb-4 border-b pb-4 last:border-none"
                    >
                      <p>
                        <strong>Phòng:</strong> {detail.booking.detail_room_id}
                      </p>
                      <p>Check-in: {detail.booking.check_in}</p>
                      <p>Check-out: {detail.booking.check_out}</p>
                      <div
                        className="py-2 text-sm cursor-pointer"
                        style={{
                          color: getStatusBookingColor(detail.booking.status),
                        }}
                      >
                        {loadingBookingId === detail.booking.id ? (
                          <button className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-700">
                            Đang chuyển...
                          </button>
                        ) : (
                          <button
                            className={`bg-${getStatusBookingColor(
                              detail.booking.status
                            )}-500 text-white py-1 px-3 rounded hover:bg-${getStatusBookingColor(
                              detail.booking.status
                            )}-700`}
                            onClick={() =>
                              onUpdateStatusBooking(
                                +detail.booking.id,
                                detail.booking.status
                              )
                            }
                          >
                            {detail.booking.status}
                          </button>
                        )}
                      </div>
                      <p>Số Lượng Phòng: {detail.booking.quantity}</p>
                      <p>
                        Khách: {detail.booking.guests} (Người lớn:{" "}
                        {detail.booking.adult}, Trẻ em:{" "}
                        {detail.booking.children})
                      </p>
                      <p>
                        Tổng số tiền:{" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Number(detail.booking.total_price))}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 flex justify-end border-t">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-2/3 bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-6">
              Bảng Hóa Đơn Dịch Vụ
            </h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      STT
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      Tên Dịch Vụ
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      Giá
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      Chọn
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((sv: Iservice, index: number) => (
                    <tr key={sv.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">
                        {sv.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-gray-600">
                        {sv.price}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(sv.id)}
                          onChange={() => handleServiceSelection(sv.id)}
                          className="w-5 h-5 accent-  blue-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseConfirmModal}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

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

export default Bookings;

// Function to get status color
function getStatusColor(status: StatusPayment) {
  switch (status) {
    case StatusPayment.PENDING:
      return "orange";
    case StatusPayment.COMPLETE:
      return "green";
    case StatusPayment.FAILED:
      return "red";
    default:
      return "gray";
  }
}

function getStatusBookingColor(status: StatusBooking) {
  switch (status) {
    case StatusBooking.PENDING:
      return "orange";
    case StatusBooking.CHECKIN:
      return "green";
    case StatusBooking.CHECKOUT:
      return "red";
    default:
      return "gray";
  }
}

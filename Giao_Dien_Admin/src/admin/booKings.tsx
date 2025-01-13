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
import { BookingCT } from "../context/booking";

type Props = {};

const Bookings = (props: Props) => {
  const { payment, onUpdateStatus, loadingPaymentId } = useContext(PaymentCT);
  // const { loadingBookingId } = useContext(BookingCT);
  const { users } = useContext(UserCT);

  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentDetail, setSelectedPaymentDetail] =
    useState<PaymentDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // State cho phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Số phòng hiển thị trên mỗi trang
  //update status booking
  const [loadingBookingId, setLoadingBookingIdBooking] = useState<
    number | null
  >(null);

  const totalPages = Math.ceil(payment.length / itemsPerPage);
  // Fetch payment and booking details
  const handleShowModal = async (payment: IPayment) => {
    setShowModal(true);
    setLoading(true);

    try {
      // Fetch payment details với đúng ID thanh toán
      const paymentDetailData = await getDetailPaymentbyId(payment.id);

      if (paymentDetailData.data && paymentDetailData.data.length > 0) {
        const paymentDetail = paymentDetailData.data[0]; // Lấy phần tử đầu tiên trong dữ liệu trả về
        setSelectedPaymentDetail(paymentDetail);
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

  const onUpdateStatusBooking = async (
    bookingId: number,
    currentStatus: StatusBooking
  ) => {
    if (!selectedPaymentDetail) return;

    setLoadingBookingIdBooking(bookingId);

    let newStatus: StatusBooking;
    if (currentStatus === StatusBooking.PENDING) {
      newStatus = StatusBooking.CHECKIN;
    } else if (currentStatus === StatusBooking.CHECKIN) {
      newStatus = StatusBooking.CHECKOUT;
    } else {
      return;
    }

    try {
      await UpdatestatusBooking(bookingId, newStatus);

      // Gọi lại API với đúng ID thanh toán
      const updatedPaymentDetail = await getDetailPaymentbyId(
        selectedPaymentDetail.payment.id
      );

      if (updatedPaymentDetail.data && updatedPaymentDetail.data.length > 0) {
        setSelectedPaymentDetail(updatedPaymentDetail.data[0]);
        console.log(`Cập nhật trạng thái thành công: ${newStatus}`);
      } else {
        console.warn("Không thể lấy lại chi tiết thanh toán sau khi cập nhật.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    } finally {
      setLoadingBookingIdBooking(null);
    }
  };

  // useEffect(() => {
  //   if (showModal && selectedPaymentDetail) {
  //     const intervalId = setInterval(() => {
  //       handleShowModal({ id: selectedPaymentDetail.id } as IPayment); // Gọi lại API
  //     }, 4000); // 60 giây

  //     return () => clearInterval(intervalId); // Dọn dẹp interval khi modal đóng hoặc selectedPaymentDetail thay đổi
  //   }
  // }, [showModal, selectedPaymentDetail, handleShowModal]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPaymentDetail(null);
  };

  useEffect(() => {
    if (selectedPaymentDetail) {
      console.log("Chi tiết thanh toán:", selectedPaymentDetail);
      console.log(
        "Chi tiết thanh toán - Payment:",
        selectedPaymentDetail.payment
      );
      console.log(
        "Chi tiết thanh toán - Booking:",
        selectedPaymentDetail.booking
      );
    }
  }, [selectedPaymentDetail]);
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
                {payment.map((pay: IPayment, index: number) => (
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
      {/* Modal */}
      {showModal && selectedPaymentDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-[700px]">
            <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-t-lg">
              <h3 className="text-lg font-semibold">Chi tiết Thanh toán</h3>
              <button onClick={handleCloseModal} className="text-white">
                ✕
              </button>
            </div>
            <div className="p-6">
              <h4 className="text-md font-semibold mb-4">
                Thông tin Thanh toán
              </h4>
              <p>
                <strong>Khách hàng:</strong>{" "}
                {selectedPaymentDetail.payment.firstname}{" "}
                {selectedPaymentDetail.payment.lastname}
              </p>
              <p>
                <strong>Phương thức:</strong>{" "}
                {selectedPaymentDetail.payment.method}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {selectedPaymentDetail.payment.status}
              </p>

              <h4 className="text-md font-semibold mt-6 mb-4">
                Danh sách Phòng
              </h4>
              <div className="border-t pt-4">
                <p>
                  <strong>Phòng</strong>
                </p>
                <p>Tên Phòng: </p>
                <p>Check-in: {selectedPaymentDetail.booking.check_in}</p>
                <p>Check-out: {selectedPaymentDetail.booking.check_out}</p>
                <p
                  className="py-4 px-6 text-sm cursor-pointer"
                  style={{
                    color: getStatusBookingColor(
                      selectedPaymentDetail.booking.status
                    ),
                  }}
                  onClick={() =>
                    onUpdateStatusBooking(
                      +selectedPaymentDetail.booking.id,
                      selectedPaymentDetail.booking.status
                    )
                  }
                >
                  {loadingBookingId === selectedPaymentDetail.booking.id ? (
                    <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">
                      Đang chuyển...
                    </button>
                  ) : (
                    <button
                      className={`bg-${getStatusBookingColor(
                        selectedPaymentDetail.booking.status
                      )}-500 text-white py-2 px-4 rounded hover:bg-${getStatusBookingColor(
                        selectedPaymentDetail.booking.status
                      )}-700`}
                      onClick={() =>
                        onUpdateStatusBooking(
                          +selectedPaymentDetail.booking.id,
                          selectedPaymentDetail.booking.status
                        )
                      }
                    >
                      {selectedPaymentDetail.booking.status}
                    </button>
                  )}
                </p>
                <p>Số Lượng Phòng: {selectedPaymentDetail.booking.quantity}</p>
                <p>
                  Khách: {selectedPaymentDetail.booking.guests} (Người lớn:{" "}
                  {selectedPaymentDetail.booking.adult}, Trẻ em:{" "}
                  {selectedPaymentDetail.booking.children})
                </p>
                <p>
                  Tổng số tiền:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(Number(selectedPaymentDetail.booking.total_price))}
                </p>
              </div>
            </div>
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

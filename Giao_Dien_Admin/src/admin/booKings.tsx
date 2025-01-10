import React, { useContext, useState, useEffect } from "react";
import { PaymentCT } from "../context/payment";
import { Ibooking, IPayment, StatusPayment } from "../interface/booking";
import { UserCT } from "../context/user";
import { getDetailPaymentbyId, getbookingbyId } from "../services/booking";

type Props = {};

const Bookings = (props: Props) => {
  const { payment, onUpdateStatus, loadingPaymentId } = useContext(PaymentCT);
  const { users } = useContext(UserCT);

  const [showModal, setShowModal] = useState(false);
  const [selectedpayment, setSelectedpayment] = useState<IPayment | null>(null);
  const [paymentDetail, setPaymentDetail] = useState<any | null>(null);
  const [bookingDetail, setBookingDetail] = useState<Ibooking[]>([]);
  const [showGuests, setShowGuests] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch payment and booking details
  const handleShowModal = async (payments: IPayment) => {
    setSelectedpayment(payments);
    setShowModal(true);
    setLoading(true);

    try {
      const paymentData = await getDetailPaymentbyId(payments.id);
      setPaymentDetail(paymentData);

      const bookingData = await getbookingbyId();
      setBookingDetail(bookingData);

      setError(null);
    } catch (error) {
      setError("Không thể lấy chi tiết thanh toán hoặc đặt phòng.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedpayment(null);
    setPaymentDetail(null);
    setBookingDetail([]);
    setShowGuests(false);
  };

  useEffect(() => {
    if (selectedpayment && paymentDetail && bookingDetail.length > 0) {
      console.log("Chi tiết thanh toán:", paymentDetail);
      console.log("Chi tiết đặt phòng:", bookingDetail);
    }
  }, [selectedpayment, paymentDetail, bookingDetail]);

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
      {showModal && (
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
                {users.find((u) => u.id === selectedpayment?.user_id)?.name}
              </p>
              <p>
                <strong>Phương thức:</strong> {selectedpayment?.method}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedpayment?.status}
              </p>

              <h4 className="text-md font-semibold mt-6 mb-4">
                Danh sách Phòng
              </h4>
              <div className="overflow-y-auto max-h-48">
                {bookingDetail.map((room: Ibooking, idx: number) => (
                  <div key={idx} className="border-t pt-4">
                    <p>
                      <strong>Phòng {idx + 1}</strong>
                    </p>
                    <p>Check-in: {room.check_in}</p>
                    <p>Check-out: {room.check_out}</p>
                    <p>
                      Khách: {room.guests} (Người lớn: {room.adult}, Trẻ em:{" "}
                      {room.children})
                    </p>
                    <p>
                      Tổng số tiền:{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(room.total_price)}
                    </p>
                  </div>
                ))}
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

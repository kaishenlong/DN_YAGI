import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getallPayment,
  UpdatestatusPayment,
  getDetailPaymentbyId,
} from "../../service/booking";
import {
  IPayment,
  StatusPayment,
  PaymentDetail,
} from "../../interface/booking";

const History = () => {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null);
  const [paymentDetail, setPaymentDetail] = useState<PaymentDetail | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const fetchedPayments = await getallPayment();
        setPayments(fetchedPayments.data);
        setIsOpen(new Array(fetchedPayments.data.length).fill(false));
      } catch (error) {
        console.error("Error fetching payment data:", error);
        alert("Error fetching payment data.");
      }
    })();
  }, []);

  const handleRebook = (paymentId: number) => {
    navigate("/");
  };

  const toggleDropdown = (index: number) => {
    setIsOpen((prevIsOpen) =>
      prevIsOpen.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  const handleCancel = (payment: IPayment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const confirmCancel = async () => {
    if (selectedPayment) {
      try {
        await UpdatestatusPayment(selectedPayment.id, StatusPayment.FAILED);
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.id === selectedPayment.id
              ? { ...payment, status: StatusPayment.FAILED }
              : payment
          )
        );
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error cancelling payment:", error);
        alert("Error cancelling payment.");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewDetails = async (paymentId: number) => {
    try {
      const detail = await getDetailPaymentbyId(paymentId);
      setPaymentDetail(detail);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error("Error fetching payment details:", error);
      alert("Error fetching payment details.");
    }
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setPaymentDetail(null);
  };

  return (
    <div className="flex flex-col items-center mt-20 mb-20">
      <div className="relative mb-10">
        <h3 className="text-center text-3xl font-bold text-gray-700">
          Lịch sử thanh toán
        </h3>
        <hr className="mt-2 border-t-2 border-blue-600" />
      </div>
      <div className="flex flex-col w-full max-w-5xl space-y-10">
        {payments.map((payment: IPayment, index: number) => (
          <div
            key={payment.id}
            className="flex flex-col md:flex-row items-center justify-between border border-gray-300 rounded-lg p-6 shadow-md bg-white"
          >
            <div className="flex flex-col space-y-2">
              <h6 className="text-lg font-bold text-gray-800">
                {payment.firstname} {payment.lastname}
              </h6>
              <span className="text-sm text-gray-600">
                Số điện thoại: {payment.phone}
              </span>
              <span className="text-sm text-gray-600">
                Phương thức: {payment.method}
              </span>
              <button
                onClick={() => handleViewDetails(payment.id)}
                className="text-sm text-blue-600 underline"
              >
                Chi tiết đơn đặt
              </button>
            </div>
            <div className="flex flex-col items-center mt-4 md:mt-0 space-y-4">
              <div
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  payment.status === StatusPayment.COMPLETE
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {payment.status === StatusPayment.COMPLETE
                  ? "Mới đặt"
                  : "Đã hủy"}
              </div>
              <button
                className="px-6 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600"
                onClick={() => toggleDropdown(index)}
              >
                {payment.status === StatusPayment.COMPLETE
                  ? "Đã đặt"
                  : "Đã hủy"}
              </button>
              {isOpen[index] && (
                <div className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {payment.status === StatusPayment.COMPLETE && (
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        onClick={() => handleCancel(payment)}
                      >
                        Hủy đặt
                      </button>
                    )}
                    {payment.status === StatusPayment.FAILED && (
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
                        onClick={() => handleRebook(payment.id)}
                      >
                        Đặt lại
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              Xác nhận hủy đặt
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Bạn có chắc chắn muốn hủy không?
            </p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={closeModal}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={confirmCancel}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
      {isDetailModalOpen && paymentDetail && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg">
            <h2 className="text-lg font-semibold text-gray-800">
              Chi tiết đơn đặt
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Chi tiết thanh toán:</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Phương thức: {paymentDetail.payment.method}</li>
              <li>Tổng số tiền: {paymentDetail.payment.total_amount}</li>
              <li>Trạng thái: {paymentDetail.payment.status}</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Chi tiết đặt phòng:</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Check-in: {paymentDetail.booking.check_in}</li>
              <li>Check-out: {paymentDetail.booking.check_out}</li>
              <li>Số khách: {paymentDetail.booking.guests}</li>
              <li>Tổng giá: {paymentDetail.booking.total_price}</li>
            </ul>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={closeDetailModal}
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

export default History;

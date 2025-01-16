import React, { createContext, useEffect, useState } from "react";
import { IPayment, StatusPayment } from "../interface/booking";
import { getallPayment, UpdatestatusPayment } from "../services/booking"; // Nhớ import hàm UpdatestatusBooking và UpdatestatusPayment

type Props = {
  children: React.ReactNode;
};

export const PaymentCT = createContext({} as any);

const PaymentContext = ({ children }: Props) => {
  const [payment, setPayment] = useState<IPayment[]>([]);
  const [loadingPaymentId, setLoadingPaymentId] = useState<number | null>(null); // Lưu trữ id thanh toán đang được cập nhật
  useEffect(() => {
    (async () => {
      try {
        const paymentData = await getallPayment();
        // console.log("Fetched payment data:", paymentData); // Kiểm tra dữ liệu
        setPayment(paymentData.data);
      } catch (error) {
        alert("Error fetching data");
      }
    })();
  }, []);

  // Cập nhật trạng thái thanh toán
  const onUpdateStatus = async (
    id: number | string,
    currentStatus: StatusPayment
  ) => {
    if (currentStatus === StatusPayment.FAILED) {
      console.warn("Cannot update status: Payment is already FAILED.");
      return; // Không thực hiện thay đổi nếu trạng thái là FAILED
    }

    if (typeof id === "number") {
      setLoadingPaymentId(id); // Set loading state cho payment
    }

    // Xác định trạng thái tiếp theo trong chu kỳ
    let newStatus: StatusPayment = StatusPayment.PENDING; // Gán giá trị mặc định ban đầu
    if (currentStatus === StatusPayment.PENDING) {
      newStatus = StatusPayment.COMPLETE; // Chuyển từ PENDING sang COMPLETE
    } else if (currentStatus === StatusPayment.COMPLETE) {
      newStatus = StatusPayment.FAILED; // Chuyển từ COMPLETE sang FAILED
    }

    try {
      // Cập nhật trạng thái thanh toán
      const updatedPayment = await UpdatestatusPayment(id, newStatus);
      // Lấy lại dữ liệu payment sau khi cập nhật trạng thái
      const data = await getallPayment();
      // console.log("Fetched payment data:", data); // Kiểm tra dữ liệu
      setPayment(data.data); // Cập nhật lại state payment
      console.log(`Payment status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating payment status:", error);
    } finally {
      setLoadingPaymentId(null); // Reset loading state
    }
  };

  return (
    <PaymentCT.Provider
      value={{
        payment,
        onUpdateStatus,
        loadingPaymentId,
      }}
    >
      {children}
    </PaymentCT.Provider>
  );
};

export default PaymentContext;

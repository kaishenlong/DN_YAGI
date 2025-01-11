import React, { createContext, useEffect, useState } from "react";
import { IPayment, StatusPayment } from "../interface/booking";
import { getallPayment, UpdatestatusPayment } from "../services/booking"; // Nhớ import hàm UpdatestatusPayment

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
        const data = await getallPayment();
        console.log("Fetched booking data:", data); // Check format
        setPayment(data.data);
      } catch (error) {
        alert("Error fetching payments");
      }
    })();
  }, []);

  // Assuming the PaymentCT context has the onUpdateStatus function
  // Updated onUpdateStatus function to handle 3 states
  const onUpdateStatus = async (
    id: number | string,
    currentStatus: StatusPayment
  ) => {
    if (typeof id === "number") {
      setLoadingPaymentId(id); // Set loading state for the specific payment
    }

    // Define the next status in the cycle
    let newStatus: StatusPayment;
    if (currentStatus === StatusPayment.PENDING) {
      newStatus = StatusPayment.COMPLETE; // Move from PENDING to COMPLETE
    } else if (currentStatus === StatusPayment.COMPLETE) {
      newStatus = StatusPayment.FAILED; // Move from COMPLETE to FAILED
    } else {
      newStatus = StatusPayment.PENDING; // Move from FAILED to PENDING
    }

    try {
      const updatedPayment = await UpdatestatusPayment(id, newStatus); // Update the payment status using the service
      // Fetch all payments again to update the state without reloading the page
      const data = await getallPayment();
      console.log("Fetched booking data:", data); // Check format
      setPayment(data.data);
      console.log(`Payment status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating payment status:", error);
    } finally {
      setLoadingPaymentId(null); // Reset loading state
    }
  };

  return (
    <PaymentCT.Provider value={{ payment, onUpdateStatus, loadingPaymentId }}>
      {children}
    </PaymentCT.Provider>
  );
};

export default PaymentContext;

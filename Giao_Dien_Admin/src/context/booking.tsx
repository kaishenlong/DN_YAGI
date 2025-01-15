// import React, { createContext, useEffect, useState } from "react";
// import { Ibooking, IPayment, StatusBooking } from "../interface/booking";
// import {
//   getallBooking,
//   getDetailPaymentbyId,
//   UpdatestatusBooking,
// } from "../services/booking";

// type Props = {
//   children: React.ReactNode;
// };

// export const BookingCT = createContext({} as any);

// const BookingContext = ({ children }: Props) => {
//   const [bookings, setBookings] = useState<Ibooking[]>([]);
//   const [loadingBookingId, setLoadingBookingIdBooking] = useState<
//     number | null
//   >(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const bookingData = await getallBooking();
//         console.log("Fetched booking data:", bookingData);
//         setBookings(bookingData.data);
//       } catch (error) {
//         alert("Error fetching data");
//       }
//     })();
//   }, []);

//   const onUpdateStatusBooking = async (
//     id: number | string,
//     currentStatus: StatusBooking
//   ) => {
//     if (currentStatus === StatusBooking.CHECKOUT) {
//       console.warn("Cannot update status: Payment is already FAILED.");
//       return; // Không thực hiện thay đổi nếu trạng thái là FAILED
//     }

//     if (typeof id === "number") {
//       setLoadingBookingIdBooking(id); // Set loading state cho payment
//     }

//     // Xác định trạng thái tiếp theo trong chu kỳ
//     let newStatus: StatusBooking = StatusBooking.PENDING; // Gán giá trị mặc định ban đầu
//     if (currentStatus === StatusBooking.PENDING) {
//       newStatus = StatusBooking.CHECKIN; // Chuyển từ PENDING sang COMPLETE
//     } else if (currentStatus === StatusBooking.CHECKIN) {
//       newStatus = StatusBooking.CHECKOUT; // Chuyển từ COMPLETE sang FAILED
//     }

//     try {
//       // Cập nhật trạng thái thanh toán
//       const updatedPayment = await UpdatestatusBooking(id, newStatus);
//       // Lấy lại dữ liệu payment sau khi cập nhật trạng thái
//       const data = await getallBooking();
//       console.log("Fetched payment data:", data); // Kiểm tra dữ liệu
//       setBookings(data.data); // Cập nhật lại state payment
//       console.log(`Payment status updated to ${newStatus}`);
//     } catch (error) {
//       console.error("Error updating payment status:", error);
//     } finally {
//       setLoadingBookingIdBooking(null); // Reset loading state
//     }
//   };

//   return (
//     <BookingCT.Provider
//       value={{
//         bookings,
//         loadingBookingId,
//         onUpdateStatusBooking,
//       }}
//     >
//       {children}
//     </BookingCT.Provider>
//   );
// };

// export default BookingContext;

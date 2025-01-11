// import React, { createContext, useEffect, useState } from "react";
// import { IPayment, StatusPayment } from "../interface/booking";
// import { getallPayment, UpdatestatusPayment } from "../service/booking";

// type Props = {
//   children: React.ReactNode;
// };

// export const BookingCT = createContext({} as any);

// const BookingContext = ({ children }: Props) => {
//   const [booking, setBooking] = useState<IPayment[]>([]);
//   const [loadingBookingId, setLoadingBookingId] = useState<number | null>(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await getallPayment();
//         console.log("Fetched booking data:", data);
//         setBooking(data.data);
//       } catch (error) {
//         alert("Error fetching bookings");
//       }
//     })();
//   }, []);

//   const onUpdateStatus = async (
//     id: number | string,
//     currentStatus: StatusPayment
//   ) => {
//     if (typeof id === "number") {
//       setLoadingBookingId(id);
//     }

//     let newStatus: StatusPayment;
//     if (currentStatus === StatusPayment.PENDING) {
//       newStatus = StatusPayment.COMPLETE;
//     } else if (currentStatus === StatusPayment.COMPLETE) {
//       newStatus = StatusPayment.FAILED;
//     } else {
//       newStatus = StatusPayment.PENDING;
//     }

//     try {
//       const updatedBooking = await UpdatestatusPayment(id, newStatus);
//       const data = await getallPayment();
//       setBooking(data.data);
//       console.log(`Booking status updated to ${newStatus}`);
//     } catch (error) {
//       console.error("Error updating booking status:", error);
//     } finally {
//       setLoadingBookingId(null);
//     }
//   };

//   return (
//     <BookingCT.Provider value={{ booking, onUpdateStatus, loadingBookingId }}>
//       {children}
//     </BookingCT.Provider>
//   );
// };

// export default BookingContext;

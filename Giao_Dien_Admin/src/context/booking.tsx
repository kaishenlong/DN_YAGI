import React, { createContext, useEffect, useState } from "react";
import { Ibooking, StatusBooking } from "../interface/booking";
import { getallBooking, UpdatestatusBooking } from "../services/booking";

type Props = {
  children: React.ReactNode;
};

export const BookingCT = createContext({} as any);

const BookingContext = ({ children }: Props) => {
  const [bookings, setBookings] = useState<Ibooking[]>([]);
  const [loadingBookingId, setLoadingBookingIdBooking] = useState<
    number | null
  >(null);

  useEffect(() => {
    (async () => {
      try {
        const bookingData = await getallBooking();
        console.log("Fetched booking data:", bookingData);
        setBookings(bookingData.data);
      } catch (error) {
        alert("Error fetching data");
      }
    })();
  }, []);

  const onUpdateStatusBooking = async (
    id: number | string,
    currentStatus: StatusBooking
  ) => {
    if (currentStatus === StatusBooking.CHECKOUT) {
      console.warn("Cannot update status: Booking already CHECKED OUT.");
      return;
    }

    if (typeof id === "number") {
      setLoadingBookingIdBooking(id);
    }

    let newStatus: StatusBooking = StatusBooking.PENDING;
    if (currentStatus === StatusBooking.PENDING) {
      newStatus = StatusBooking.CHECKIN;
    } else if (currentStatus === StatusBooking.CHECKIN) {
      newStatus = StatusBooking.CHECKOUT;
    }

    try {
      await UpdatestatusBooking(id, newStatus);

      // Cập nhật trạng thái trực tiếp trong state bookings
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );

      console.log(`Booking status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating booking status:", error);
    } finally {
      setLoadingBookingIdBooking(null);
    }
  };

  return (
    <BookingCT.Provider
      value={{
        bookings,
        loadingBookingId,
        onUpdateStatusBooking,
      }}
    >
      {children}
    </BookingCT.Provider>
  );
};

export default BookingContext;

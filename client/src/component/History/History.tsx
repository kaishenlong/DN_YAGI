import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getbookingbyId, getDetailPaymentbyId, UpdatestatusPayment } from "../../service/booking";
import { PaymentDetail, StatusPayment } from "../../interface/booking";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvoiceComponent, { convertToInvoice } from "./Invoice";

const ITEMS_PER_PAGE = 5; // Number of bookings per page

const History = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [detailPayment, setDetailPayment] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const fetchedBookings = await getbookingbyId();
      const sortedBookings = fetchedBookings
        .map((booking: any) => ({
          ...booking,
          created_at: new Date(booking.created_at).toISOString().split("T")[0],
          type_room: booking.detailrooms?.room?.type_room || "N/A",
          name: booking.detailrooms?.hotel?.name || "N/A"
        }))
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setBookings(sortedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Không thể tải danh sách đặt phòng.", { autoClose: 8000 });
    }
  };

  const fetchDetailPayment = async (bookingId: number) => {
    setIsLoading(true);
    try {
      const response = await getDetailPaymentbyId(bookingId);
      console.log("Detail Payment API Response:", response);

      const fetchedDetails = response.data.find(
        (item: any) => item.booking && item.booking.id === bookingId
      );
  
      if (fetchedDetails) {
        setSelectedBooking(fetchedDetails.booking);
        setDetailPayment(fetchedDetails.payment);
        const roomInfo = fetchedDetails.booking?.detailrooms?.room;
      console.log("Room Info: ", roomInfo);
      if (roomInfo) {
        console.log("Type of Room: ", roomInfo.type_room);
      }
        setIsModalOpen(true);
       
      } else {
        toast.warn("Không tìm thấy chi tiết đơn hàng.");
      }
    } catch (error) {
      console.error("Error fetching detail payment:", error);
      toast.error("Không thể tải chi tiết đơn hàng.", { autoClose: 8000 });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handleCancelBooking = async (paymentId: number) => {
    if (!detailPayment) {
      toast.error("Không tìm thấy chi tiết thanh toán.", { autoClose: 8000 });
      return;
    }

    if (detailPayment.status !== StatusPayment.PENDING) {
      toast.warning("Không thể hủy đơn hàng đã hoàn tất thanh toán.", { autoClose: 8000 });
      return;
    }

    try {
      await UpdatestatusPayment(paymentId, StatusPayment.FAILED);
      toast.success("Đã hủy thanh toán thành công.", { autoClose: 8000 });
      setDetailPayment((prev: PaymentDetail) => ({
        ...prev,
        status: StatusPayment.FAILED,
      }));
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Không thể hủy thanh toán.", { autoClose: 8000 });
    }
  };

  const handleRebook = (id: number) => {
    navigate(`/room/${id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    setDetailPayment(null);
  };

  const openInvoiceModal = () => {
    setIsInvoiceModalOpen(true);
  };

  const closeInvoiceModal = () => {
    setIsInvoiceModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderBookingList = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentBookings = bookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return currentBookings.map((booking) => (
      <div key={booking.id} className="flex border border-gray-300 rounded-lg shadow-sm p-5">
        <div className="w-52 h-40">
          <img
            src="src/assets/img/item/sapa/room1_960x760.jpeg"
            alt="Room"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col relative mx-10">
        
             <h6 className="text-l font-extrabold text-gray-800">Hotel: {booking.name}</h6>
          <span className="mt-2 mb-1 text-gray-600">
          <h6 className="text-[16px] font-extrabold text-gray-800">Loại Phòng: {booking.type_room}</h6></span>
          <span className="mt-2 mb-1 text-gray-600">
            Checkin: {booking.check_in} - Checkout: {booking.check_out}
          </span>
          <span className="mb-3 text-gray-600">
            {booking.quantity} phòng - {booking.guests} người
          </span>
          <div className="relative">
            <button
              className="px-4 py-1 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 absolute left-0 top-0"
              onClick={() => fetchDetailPayment(booking.id)}
            >
              Xem chi tiết đơn hàng
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const renderPagination = () => (
    <div className="flex justify-center mt-5 space-x-2">
      <button
        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-lg ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );

  const renderModal = () =>
    isModalOpen &&
    selectedBooking &&
    detailPayment && (
      <div className="fixed  inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white top-11  p-8 rounded-lg shadow-lg w-full max-w-2xl relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
            &times;
          </button>
          <h4 className="text-2xl font-bold mb-5">
            Chi tiết đơn hàng - Phòng : {selectedBooking.detailrooms.room.type_room || "N/A"}
            <br />
            Số Giường: {selectedBooking.detailrooms.room.bed || "N/A"}
          </h4>
          <div className="space-y-3">
            <p>
              Ngày đặt: {new Date(selectedBooking.created_at).toLocaleDateString()} - Ngày thanh toán:{" "}
              {new Date(selectedBooking.updated_at).toLocaleDateString()}
            </p>
            <p>Số phòng: {selectedBooking.quantity}</p>
            <p>Số người: {selectedBooking.guests}</p>
          </div>
          <div className="mt-5 space-y-3">
            <h5 className="text-xl font-semibold mb-3">Chi tiết thanh toán:</h5>
            <p>
              Họ tên khách hàng: {detailPayment.firstname} {detailPayment.lastname}
            </p>
            <p>Số điện thoại: {detailPayment.phone}</p>
            <p>Phương thức thanh toán: {detailPayment.method || "N/A"}</p>
            <p>
              Trạng thái thanh toán:
              <span
                className={`ml-2 px-3 py-1 rounded-md ${
                  detailPayment.status === StatusPayment.COMPLETE
                    ? "bg-green-500 text-white"
                    : detailPayment.status === StatusPayment.FAILED
                    ? "bg-red-500 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                {detailPayment.status}
              </span>
            </p>
            <p>Tổng tiền: {Number(detailPayment.total_amount).toLocaleString()}  VND</p>
          </div>
          <div className="mt-5">
            <h5 className="font-semibold">Thao tác với đơn hàng:</h5>
            <div className="space-x-4 mt-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => handleCancelBooking(detailPayment.id)}
              >
                Hủy đơn hàng
              </button>
              {detailPayment.status === StatusPayment.COMPLETE && (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => handleRebook(selectedBooking.id)}
                >
                  Đặt lại
                </button>
              )}
            </div>
          </div>
          {detailPayment.status === StatusPayment.COMPLETE && (
            <div className="mt-5">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={openInvoiceModal}
              >
                Xem hóa đơn
              </button>
            </div>
          )}
        </div>
      </div>
    );

  const renderInvoiceModal = () =>
    isInvoiceModalOpen &&
    detailPayment && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white top-11   p-8 rounded-lg shadow-lg w-full max-w-2xl relative">
          <button
            className="absolute top-4   right-4 text-gray-500 hover:text-gray-700"
            onClick={closeInvoiceModal}
          >
            &times;
          </button>
          <InvoiceComponent invoice={convertToInvoice(selectedBooking, detailPayment)} />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center mt-[200px]">
      <ToastContainer />
      <h3 className="text-center text-4xl mb-10 font-bold">Lịch sử đặt phòng</h3>
      <div className="flex flex-col w-full max-w-4xl space-y-10">{renderBookingList()}</div>
      {renderPagination()}
      {renderModal()}
      {renderInvoiceModal()}
      {isLoading && <p>Đang tải...</p>}
    </div>
  );
};

export default History;

import api from "../config/axios";
import { StatusPayment } from "../interface/booking";

// Fetch all payments
export const getallPayment = async () => {
  try {
    const { data } = await api.get('api/payment', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Error');
  }
};

// Fetch payment by ID
export const getPaymentbyId = async (bookingId:number) => {
  try {
    const { data } = await api.get(`api/payment/show/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Error');
  }
};

// Fetch all bookings
export const getbookingbyId = async () => {
  try {
    const { data } = await api.get('api/booking', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error('Error');
  }
};

// Fetch detail payment by ID
export const getDetailPaymentbyId = async (bookingId: number | string): Promise<any> => {
  try {
    const { data } = await api.get(`api/detailspayment/${bookingId}/detail`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return data;
  } catch (error: any) {
    console.error(`Error fetching details for booking ID ${bookingId}:`, error.message);
    throw new Error("Failed to fetch payment details. Please check your connection and try again.");
  }
};

// Update payment status

export const UpdatestatusPayment = async (id: number | string, status: StatusPayment) => {
  // Chỉ cho phép trạng thái "FAILED" (hủy)
  if (status !== StatusPayment.FAILED) {
    throw new Error("Chỉ có thể thay đổi trạng thái thành 'FAILED' (Hủy).");
  }

  try {
    const { data } = await api.put(
      `api/payment/update/${id}`,
      { status }, // Body of the request
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error updating status");
  }
};


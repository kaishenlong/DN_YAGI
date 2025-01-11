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
export const getPaymentbyId = async (id: number | string) => {
  try {
    const { data } = await api.get(`api/payment/show/${id}`, {
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
export const getDetailPaymentbyId = async (id: number | string) => {
  try {
    const { data } = await api.get(`api/detailspayment/${id}/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Error');
  }
};

// Update payment status
export const UpdatestatusPayment = async (id: number | string, status: StatusPayment) => {
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
    throw new Error(error.response?.data?.message || 'Error updating status');
  }
};

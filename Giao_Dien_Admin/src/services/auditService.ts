import api from "../config/axios"

import axios from 'axios';

// Hàm tạo query string từ object
const buildQueryString = (params: Record<string, any>) => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null) // Loại bỏ các tham số không hợp lệ
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
};

export const fetchAuditList = async (filters = {}) => {
  try {
    const queryString = buildQueryString(filters);
    const url = queryString ? `api/audits?${queryString}` : `api/audits`;

    const response = await api.get(url);

    if (response.status === 200 && response.data.audits) {
      return response.data;
    } else {
      console.error("API response:", response);
      throw new Error("Failed to fetch audits");
    }
  } catch (error: any) {
    console.error("Error fetching audit list:", error.response?.data || error.message);
    throw error;
  }
};



// export const fetchAuditList = async () => {
//     const response = await api.get(`api/audits`);
//     if (response.status === 200 && response.data.audits) {
//       return response.data; // Trả về toàn bộ dữ liệu, bao gồm audits
//     } else {
//       throw new Error("Failed to fetch audits");
//     }
//   };
  

import axios from 'axios';
import { City } from '../../type/ICity';

const API_URL = 'http://127.0.0.1:8000'; // Đổi URL này thành URL API thực tế của bạn

// Hàm lấy danh sách thành phố
export const fetchCities = async (): Promise<City[]> => {
    try {
      const response = await axios.get(`${API_URL}/api/city`);
      return response.data.data as City[]; // Truy cập `data.data` nếu dữ liệu được bọc
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  };
  
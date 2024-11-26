import api from "../config/axios";
import axios from "../config/axios";
import { IUser } from "../interface/product";

export const loginUser = async (email: string, password: string): Promise<IUser> => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };
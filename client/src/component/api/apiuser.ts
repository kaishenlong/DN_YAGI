import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Đổi URL này thành URL API thực tế của bạn

interface User {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (userData: User): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};
export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  try { await axios.post(`${API_URL}/api/forgot-password`, { email }); }
  catch (error) {
    console.error('Error sending reset email:', error); throw error;
  }
};
export const resetPassword = async (token: string | null, password: string, email:string,password_confirmation: string): Promise<void> => { 
    try { await axios.post(`${API_URL}/api/password/reset`, { token, password, email,password_confirmation });
 } catch (error) { 
    console.error('Error resetting password:', error); throw error; }
 };
   
//    export const verifyToken = async (token: string): Promise<void> =>
//      { try { await axios.post(`${API_URL}/api/password/reset`, { token });
//  } catch (error) {
//      console.error('Error verifying token:', error);
//       throw error; } };

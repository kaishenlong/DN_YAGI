import axios from 'axios';
import { useState } from 'react';

const API_URL = 'http://127.0.0.1:8000'; // Đổi URL này thành URL API thực tế của bạn

interface User {
  user: {
    address: string | null; created_at: string;
    email: string;
    email_verified_at: string | null;
    id: number; identity_card: string | null;
    name: string; phone: string | null;
    role: string; status: string;
    updated_at: string;
  };
  token: string;
}

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { email, password });

    const userData: User = response.data;
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    return userData;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
export const logoutUser = async (): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true, });
    if (response.status === 200) {
      
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      console.log("Đã đăng xuất thành công");
    } else { console.error('Failed to log out:', response.status, response.statusText); }
  } catch (error) { console.error('Error logging out:', error); }
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
export const resetPassword = async (token: string | null, password: string, email: string, password_confirmation: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/api/password/reset`, { token, password, email, password_confirmation });
  } catch (error) {
    console.error('Error resetting password:', error); throw error;
  }
};

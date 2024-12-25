import axios from "axios";

const api = axios.create({
    baseURL:"http://127.0.0.1:8000",
    headers: {
        'Content-Type': 'application/json'
    }
})
// Thêm Interceptor cho request để tự động thêm token vào header Authorization
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Gắn token vào header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Trả về lỗi nếu có vấn đề trong request
    }
);

// Thêm Interceptor cho response để xử lý lỗi
api.interceptors.response.use(
    (response) => response, // Nếu không có lỗi, trả về response
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Token hết hạn hoặc không hợp lệ!');
            // Tùy chọn: Đăng xuất người dùng hoặc điều hướng về trang đăng nhập
            // localStorage.removeItem('token'); 
            // window.location.href = '/login'; 
        }
        return Promise.reject(error); // Trả về lỗi để frontend có thể xử lý
    }
);

export default api
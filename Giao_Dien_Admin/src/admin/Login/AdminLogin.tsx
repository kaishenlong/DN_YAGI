import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/user";
import { FaTimes } from "react-icons/fa";

type Props = { onLogin: (role: string, name: string, token: string) => void };

const AdminLogin: React.FC<Props> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không đúng định dạng";
    }
    if (!password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    }
    return newErrors;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const userData = await loginUser(email, password); // Hàm này phải trả về token
      if (userData.user.role === "admin" || userData.user.role === "business") {
        onLogin(userData.user.role, userData.user.name, userData.token);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("userRole", userData.user.role);
        localStorage.setItem("userName", userData.user.name);
        navigate("/dashboard");
      } else {
        setApiError(
          "Bạn không có quyền truy cập. Vui lòng đăng nhập bằng tài khoản admin hoặc business."
        );
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        ...errors,
        password:
          "Tài khoản hoặc mật khẩu sai. Vui lòng kiểm tra lại thông tin.",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-900 bg-opacity-90 z-50">
      <div className="relative w-1/2 h-[90%] bg-white rounded-lg shadow-2xl">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2"
        >
          <FaTimes className="h-6 w-6" />
        </button>
        <div className="w-full h-full flex">
          <div className="relative w-1/2 h-full flex flex-col justify-center items-center bg-blue-700 rounded-l-lg p-6">
            <div className="flex flex-col p-4">
              <h1 className="text-white font-montserrat text-4xl font-bold leading-[58.51px]">
                Chào mừng bạn đến với Admin Panel
              </h1>
              <p className="text-white font-montserrat text-xl italic font-extralight leading-[29.26px] mt-4">
                Đăng nhập để quản lý hệ thống
              </p>
            </div>
          </div>
          <div className="w-1/2 h-full bg-white flex flex-col p-8 justify-center items-center rounded-r-lg">
            <div className="w-full flex flex-col max-w-[400px]">
              <h3 className="font-montserrat text-3xl font-bold mb-4">
                Admin Đăng nhập
              </h3>
              <p className="font-montserrat text-base font-light text-[16px] leading-[16.29px] text-left mb-4">
                Xin chào, hãy nhập thông tin để đăng nhập.
              </p>
              {apiError && <p className="text-red-500">{apiError}</p>}
              <form onSubmit={handleLogin} className="w-full">
                <div className="mt-4 mb-4">
                  <label
                    htmlFor="email"
                    className="font-montserrat text-base font-medium leading-[19.5px] text-left"
                  >
                    Email
                  </label>
                  <span className="text-red-500">*</span>
                  <input
                    id="email"
                    className="w-full h-[40px] mt-2 border border-gray-300 rounded-lg px-4"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="mt-4 mb-4">
                  <label
                    htmlFor="password"
                    className="font-montserrat text-base font-medium leading-[19.5px] text-left"
                  >
                    Mật khẩu
                  </label>
                  <span className="text-red-500">*</span>
                  <input
                    id="password"
                    className="w-full h-[40px] mt-2 border border-gray-300 rounded-lg px-4"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
                </div>
                <div className="w-full flex flex-col my-4 items-center">
                  <button
                    className="w-full text-white my-2 bg-blue-600 hover:bg-blue-700 rounded-lg p-3 transition duration-300"
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

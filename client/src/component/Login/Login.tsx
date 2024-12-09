import React, { useState } from "react";
import "./Login.css";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/apiuser";

type Props = { onLogin: (name: string) => void };
const Login: React.FC<Props> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

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

  const handleClose = () => {
    navigate("/");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const userData = await loginUser(email, password);
      console.log("User logged in successfully:", userData);
      onLogin(userData.user.name);
      navigate("/");
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
    <div
      className="w-full h-screen  flex items-start"
      
    >
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col p-4">
          <h1 className="text-[#ffffff] font-montserrat text-4xl font-bold leading-[58.51px] text-left">
            Chào mừng bạn đến với YaGi Hotel
          </h1>
          <p className="text-[#ffffff] font-montserrat text-xl italic font-extralight leading-[29.26px] text-left">
            Nơi trải nghiệm cuộc sống sang trọng
          </p>
        </div>
        <img
          src="src/assets/img/dangki.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <button
        onClick={handleClose}
        className="text-red-500 font-bold py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
      >
        <FaTimes className="h-4 w-4" />
      </button>
      <div className="w-1/2 h-full  flex flex-col p-8 justify-between">
        <div className="w-full flex ml-[120px] mt-20 flex-col max-w-[500px]">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-700">Đăng nhập</h1>
            <p className="text-xl text-gray-500 mt-1">
              Nhập thông tin để truy cập tài khoản của bạn
            </p>
          </div>
          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-xl mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-600"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
            >
              Đăng nhập
            </button>

            {/* Forgot Password Link */}
            <div className="text-center text-lg mt-2">
              <Link
                to="/reset"
                className="text-lg text-blue-500 hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center justify-center space-x-2">
            <div className="w-1/5 h-px bg-gray-300"></div>
            <span className="text-lg text-gray-500">hoặc</span>
            <div className="w-1/5 h-px bg-gray-300"></div>
          </div>

          {/* Google Login Option */}
          <div className="flex items-center justify-center">
            <button
              className="w-full flex items-center justify-center space-x-2 bg-gray-100 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200 ease-in-out"
              onClick={() => console.log("Google login")}
            >
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                className="h-6 mr-2"
                alt=""
              />
              <span className="text-xl text-gray-700">
                Đăng nhập với Google
              </span>
            </button>
          </div>

          {/* Sign Up Section */}
          <div className="text-center mt-4 text-xl text-gray-500">
            <span>Bạn chưa có tài khoản?</span>
            <Link to="/register" className="text-blue-500 hover:underline ml-1">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

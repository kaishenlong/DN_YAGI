import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/apiuser";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  // Validation logic
  const validate = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!name) {
      newErrors.name = "Họ và tên là bắt buộc";
    }
    if (!email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không đúng định dạng";
    }
    if (!password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    return newErrors;
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const userData = await registerUser({ name, email, password });
      console.log("User registered successfully:", userData);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({
        ...errors,
        password: "Tài khoản đã tồn tại. Vui lòng kiểm tra lại thông tin.",
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-start">
      {/* Banner Section */}
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
          alt="register-banner"
        />
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="text-red-500 font-bold py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
      >
        <FaTimes className="h-4 w-4" />
      </button>

      {/* Registration Form */}
      <div className="w-1/2 h-full bg-[#ffffff] flex flex-col p-8 justify-between">
        <div className="w-full flex ml-[120px] mt-20 flex-col max-w-[500px]">
          <h3 className="font-montserrat text-4xl font-bold mb-4">Đăng ký</h3>
          <p className="text-gray-500 text-xl mb-4">
            Xin chào, hãy nhập thông tin để đăng ký tài khoản mới
          </p>

          {/* Form Section */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-xl font-medium"
              >
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-xl font-medium"
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
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-xl font-medium"
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
              className="w-full text-xl bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 ease-in-out"
            >
              Đăng ký
            </button>
          </form>

          {/* Switch to Login */}
          <div className="text-center mt-4 text-xl text-gray-500">
            <span>Bạn đã có tài khoản?</span>
            <Link to="/login" className="text-blue-500 hover:underline ml-1">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

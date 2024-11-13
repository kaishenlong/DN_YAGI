import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from '../api/apiuser';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string }>({});

  const validate = () => {
    const newErrors: { email?: string } = {};
    if (!email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không đúng định dạng';
    }
    return newErrors;
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await sendPasswordResetEmail(email);
      setMessage('Email reset mật khẩu đã được gửi!');
    } catch (error) {
      console.error('Error sending reset email:', error);
      setErrors({ ...errors, email: 'Gửi email thất bại. Vui lòng kiểm tra lại thông tin.' });
    }
  };

  return (
    <div className='w-full h-screen flex items-start'>
      <div className="relative w-1/2 h-full flex flex-col">
        <div className='absolute top-[20%] left-[10%] flex flex-col p-4'>
          <h1 className='text-[#ffffff] font-montserrat text-4xl font-bold leading-[58.51px] text-left'>
            Chào mừng bạn đến với YaGi Hotel
          </h1>
          <p className="text-[#ffffff] font-montserrat text-xl italic font-extralight leading-[29.26px] text-left">
            Nơi những cảm xúc được bắt đầu
          </p>
        </div>
        <img src="src/assets/img/dangki.jpg" className='w-full h-full object-cover' alt="" />
      </div>
      <button
        onClick={handleClose}
        className="text-red-500 font-bold py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
      >
        <FaTimes className="h-4 w-4" />
      </button>
      <div className='w-1/2 h-full bg-[#ffffff] flex flex-col p-8 justify-between'>
        <div className='w-full flex ml-[120px] mt-20 flex-col max-w-[500px]'>
          <h3 className='font-montserrat text-3xl font-bold mb-2'>Quên mật khẩu</h3>
          <p className='font-montserrat text-base font-light text-[16px] leading-[16.29px] text-left'>
            Nhập email của bạn để nhận liên kết reset mật khẩu.
          </p>
          <div className='mt-2 mb-2 relative'>
            <label htmlFor="email" className='font-montserrat text-base font-medium leading-[19.5px] text-left'>
              Email
            </label>
            <span className='text-red-500'>*</span>
           
          </div>
          <input
            id='email'
            className='w-[212px] h-[27px] border border-[#B1A9A9] rounded-[3px]'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           {errors.email && <p className="text-red-500">{errors.email}</p>}
          <div className='w-full flex flex-col my-2 items-center'>
            <button
              className='w-2/3 text-white my-2 bg-[#0460B1D6] rounded-md p-2 text-center flex items-center justify-center'
              onClick={handleSubmit}
            >
             <Link to="/newpassword">Gửi email reset mật khẩu</Link> 
            </button>
            {message && <p className="text-green-500">{message}</p>}
            <div className='w-full flex items-center justify-center mt-4'>
              <p className='text-sm font-normal text-[#0460B1D6]'>
                <Link to="/login">Trở lại trang đăng nhập</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

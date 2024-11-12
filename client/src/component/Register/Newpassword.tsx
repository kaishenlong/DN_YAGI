import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../api/apiuser';

const TokenAndPasswordReset: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email?: string; token?: string; password?: string; passwordConfirmation?: string; apiError?: string }>({});
    const [message, setMessage] = useState<string>('');

    const validate = () => {
        const newErrors: { email?: string; token?: string; password?: string; passwordConfirmation?: string } = {};
        if (!email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email không đúng định dạng';
        }
        if (!token) {
            newErrors.token = 'Token là bắt buộc';
        } else if (token.length !== 6) {
            newErrors.token = 'Token phải có 6 chữ số';
        }
        if (!password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }
        if (password !== passwordConfirmation) {
            newErrors.passwordConfirmation = 'Mật khẩu xác nhận không khớp';
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

            await resetPassword(token, password, email, passwordConfirmation);
            setMessage('Mật khẩu đã được đặt lại thành công!');
            navigate('/login');
        } catch (error: any) {
            if (error.response && error.response.data) {
                console.error('Error resetting password:', error.response.data);
                setErrors({ apiError: error.response.data.message });
            } else {
                console.error('Error resetting password:', error.message);
                setErrors({ apiError: 'Lỗi khi đặt lại mật khẩu. Vui lòng thử lại.' });
            }
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
                    <h3 className='font-montserrat text-3xl font-bold mb-2'>Xác nhận mã token và đặt lại mật khẩu</h3>
                    <p className='font-montserrat text-base font-light text-[16px] leading-[16.29px] text-left'>
                        Nhập mã token 6 chữ số được gửi đến email của bạn và đặt lại mật khẩu mới.
                    </p>
                    <div className='mt-2 mb-2 relative'>
                        <label htmlFor="email" className='font-montserrat text-base font-medium leading-[19.5px] text-left'>
                            Email
                        </label>
                        <span className='text-red-500'>*</span>
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <input
                        id='email'
                        className='w-[212px] h-[27px] border border-[#B1A9A9] rounded-[3px]'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className='mt-2 mb-2 relative'>
                        <label htmlFor="token" className='font-montserrat text-base font-medium leading-[19.5px] text-left'>
                            Mã token
                        </label>
                        <span className='text-red-500'>*</span>
                        {errors.token && <p className="text-red-500">{errors.token}</p>}
                    </div>
                    <input
                        id='token'
                        className='w-[212px] h-[27px] border border-[#B1A9A9] rounded-[3px]'
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <div className='mt-2 mb-2 relative'>
                        <label htmlFor="password" className='font-montserrat text-base font-medium leading-[19.5px] text-left'>
                            Mật khẩu mới
                        </label>
                        <span className='text-red-500'>*</span>
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>
                    <input
                        id='password'
                        className='w-[212px] h-[27px] border border-[#B1A9A9] rounded-[3px]'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='mt-2 mb-2 relative'>
                        <label htmlFor="confirmPassword" className='font-montserrat text-base font-medium leading-[19.5px] text-left'>
                            Xác nhận mật khẩu mới
                        </label>
                        <span className='text-red-500'>*</span>
                        {errors.passwordConfirmation && <p className="text-red-500">{errors.passwordConfirmation}</p>}
                    </div>
                    <input
                        id='confirmPassword'
                        className='w-[212px] h-[27px] border border-[#B1A9A9] rounded-[3px]'
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className='w-full flex flex-col my-2 items-center'>
                        <button
                            className='w-2/3 text-white my-2 bg-[#0460B1D6] rounded-md p-2 text-center flex items-center justify-center'
                            onClick={handleSubmit}
                        >
                            Đặt lại mật khẩu
                        </button>
                        {errors.apiError && <p className="text-red-500">{errors.apiError}</p>}
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

export default TokenAndPasswordReset;



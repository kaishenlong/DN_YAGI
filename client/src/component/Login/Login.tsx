import React from 'react'
import './Login.css'
import { FaTimes } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  }
  return (
    <div className='w-full h-screen flex items-start'>
      <div className="relative w-1/2 h-full flex flex-col">
        <div className='absolute top-[20%] left-[10%] flex flex-col p-4'>
          <h1 className=' text-[#ffffff] font-montserrat text-4xl font-bold leading-[58.51px] text-left'>Chào mừng bạn đến với YaGi Hotel</h1>
          <p className="text-[#ffffff]  font-montserrat text-xl italic font-extralight leading-[29.26px] text-left">Nơi những cảm xúc được bắt đầu</p>
        </div>
        <img src="src/assets/img/dangki.jpg " className='w-full h-full object-cover' alt="" />
      </div>
      <button
          onClick={handleClose}
          className=" text-red-500font-bold py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <FaTimes className="h-4 w-4" />
        </button>
      <div className='w-1/2 h-full bg-[#ffffff] flex flex-col p-8 justify-between'>
      
        <div className='w-full flex ml-[120px] mt-20 flex-col max-w-[500px] '>
          <h3 className='font-montserrat text-3xl font-bold mb-2'>Đăng nhập</h3>
          <p className='font-montserrat  text-base font-light text-[16px] leading-[16.29px] text-left'>Xin chào, hãy nhập thông tin để đăng nhập.</p>
          <div className='mt-2 mb-2 relative'>
            <label htmlFor="" className='font-montserrat text-base font-medium leading-[19.5px] text-left' >Email
            </label>
            <span className='text-red-500'>*</span>
          </div>
          <input id='email' className='w-[212px] h-[27px] border border-[#B1A9A9] rounded-[3px]' type="email" />
          <div className='mt-2 mb-2 relative'>
            <label htmlFor="" className='font-montserrat text-base font-medium leading-[19.5px] text-left' >Mật khẩu
            </label>
            <span className='text-red-500'>*</span>
          </div>
          <input id='password' className='w-[212px] h-[27px] border border-[#B1A9A9] rounded-[3px]' type="password" />
          <a href="http://" className="text-[#0C2C49D6] mt-4 underline">Quên mật khẩu</a>
          <div className='w-full flex flex-col my-2  items-center '>
            <button className='w-2/3 text-white my-2  bg-[#0460B1D6] rounded-md p-2 text-center flex items-center justify-center'>
              Đăng nhập
            </button>
            <button className='w-2/3 text-[#0460B1D6] my-2  bg-[#f9fafbd6] border-2 boder-[#0460B1D6] rounded-md p-2 text-center flex items-center justify-center'>
            <Link to='/register'>Đăng kí</Link> 
            </button>
            <div className='w-full flex flex-col items-center justify-center  '>

              <p className='text-md  text-black/80  bg-[#ffffff]'>or</p>

              <div className='w-2/3 text-[#040404d6] my-2  bg-[#f9fafbd6] border-2 boder-[#0460B1D6] rounded-md p-2 text-center flex items-center justify-center'>
                <img src="src/assets/img/dangki2.jpg" className='h-6 mr-2' alt="" />
                Đăng nhập với Google
              </div>

            </div>
            <div className='w-full flex items-center justify-center'>
              <p className='text-sm font-normal text-[#0460B1D6]'>Bạn chưa có tài khoản?<span className='font'><a href="">Tạo tài khoản mới.</a></span></p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login

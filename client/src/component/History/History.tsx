import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const History = () => {
    const [status, setStatus] = useState('booked');
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    const handleRebook = () => {
        navigate('/rebook');
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleCancel = () => {
        setIsModalOpen(true);
    };

    const confirmCancel = () => {
        setStatus('cancelled');
        setIsModalOpen(false);
        setIsOpen(false);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='flex flex-col items-center mt-40'>
            <div className='relative  '>
                <h3 className='text-center  text-[36px]'>Lịch sử đặt phòng</h3>
                <hr className='absolute left-16 right-16 bottom-0 border-t-2 border-[#00396B96]' />
            </div>
            <div className='flex flex-col w-[1000px]  '>
                <div className='h-[200px] flex border border-gray-300 my-20 p-5'>
                    <div className='w-[200px] h-[159px]'>
                        <img src="src/assets/img/item/sapa/room1_960x760.jpeg" alt="" />
                    </div>
                    <div className='flex flex-col mx-10'>
                        <h6 className='font-montserrat text-xl font-extrabold leading-[24.38px] text-[#242222CC] text-left'>Grand Resort Sapa-Lào Cai </h6>
                        <span><i className="fa-solid fa-location-dot"></i> Sapa-Lào Cai -  <a href="" className='text-[#0460B1D6]'>Xem trên bản đồ</a></span>
                        <span className='mt-2 mb-1'>01/09/2024-10/09/2024</span>
                        <span className='mb-3'>1 phòng - 4 người</span>
                        <a href="http://" className='underline text-[#0460B1D6]'>Chi tiết đơn hàng</a>
                    </div>
                    <div className='relative '>
                        <div className='absolute bg-[#F5A52DBA] w-40 left-56 flex items-center justify-center'>
                            <span className='flex items-center  '>Mới đặt</span>
                        </div>

                        <div className="relative inline-block mt-16 ml-24">
                            <div>
                                <button
                                    type="button"
                                    className={`inline-flex justify-center  w-[188px] h-[42px]  rounded-md border border-gray-300 shadow-sm px-4 py-2 text-[16px] font-medium text-white focus:outline-none ${status === 'booked' ? 'bg-blue-500' : 'bg-red-500'
                                        }`}
                                    onClick={toggleDropdown}
                                >
                                    {status === 'booked' ? 'Đã đặt' : 'Đã hủy'}
                                    <svg
                                        className="-mr-1 ml-2 h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {isOpen && (
                                <div
                                    className="origin-top-right absolute right-0 mt-2 w-[188px] h-[42px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                >
                                    <div className="py-1" role="none">
                                        {status === 'booked' && (
                                            <button
                                                className=" block px-4 py-2  w-[188px] h-[42px] text-center bg-red-500 text-white text-[16px]  rounded-md"
                                                onClick={handleCancel}
                                            >
                                                Hủy đặt
                                            </button>
                                        )}
                                        {status === 'cancelled' && (
                                            <button
                                                className=" block px-4 py-2  w-[188px] h-[42px] ext-center bg-yellow-500 text-white text-[16px]  rounded-md"
                                                onClick={handleRebook}
                                            >
                                                Đặt lại
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {isModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                    <div className="fixed inset-0 bg-black opacity-50"></div>
                                    <div className="bg-white rounded-lg shadow-lg p-6 z-50">
                                        <h2 className="text-xl font-semibold mb-4">Xác nhận hủy đặt</h2>
                                        <p className="mb-4">Bạn có chắc chắn muốn hủy không?</p>
                                        <div className="flex justify-end space-x-4">
                                            <button
                                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                                onClick={closeModal}
                                            >
                                                Hủy
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                                onClick={confirmCancel}
                                            >
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default History

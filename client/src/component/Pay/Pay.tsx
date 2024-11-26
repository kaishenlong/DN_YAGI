import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
    const [formState, setFormState] = useState({
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        paymentMethod: 'momo', // Default to 'momo'
    });

    const [selectedOption, setSelectedOption] = useState('option1');

    // Tóm tắt phòng đã đặt
    const bookedRooms = [
        {
            id: 1,
            name: 'Grand Resort Sapa-Lào Cai',
            dates: '01/09/2024 - 10/09/2024',
            guests: '1 phòng - 4 người',
            price: 2000000,
            image: 'src/assets/img/item/sapa/room1_960x760.jpeg',
        },
        {
            id: 2,
            name: 'Luxury Hotel Hanoi',
            dates: '05/10/2024 - 15/10/2024',
            guests: '2 phòng - 6 người',
            price: 3500000,
            image: 'src/assets/img/item/sapa/room1_960x760.jpeg',
        },
    ];

    const totalPrice = bookedRooms.reduce((total, room) => total + room.price, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-[170px] px-4">
            <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Thông tin thanh toán</h1>

                {/* Form thanh toán */}
                <div className="mb-6">
                    <div className="flex gap-8">
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="lastName" className="font-medium mb-2">
                                Họ <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                value={formState.lastName}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-lg"
                                type="text"
                                placeholder="Nhập họ"
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="firstName" className="font-medium mb-2">
                                Tên <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                value={formState.firstName}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-lg"
                                type="text"
                                placeholder="Nhập tên"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="email" className="font-medium mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-lg"
                            type="email"
                            placeholder="Nhập email"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="phone" className="font-medium mb-2">
                            Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-lg"
                            type="tel"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                </div>

                {/* Phương thức thanh toán */}
                <div className="mb-6">
                    <h2 className="font-semibold text-lg">Phương thức thanh toán</h2>
                    <div className="mt-4 space-y-4">
                        <label className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="momo"
                                checked={selectedOption === 'option1'}
                                onChange={() => setSelectedOption('option1')}
                                className="form-radio text-blue-600"
                            />
                            <span>Ví điện tử</span>
                        </label>
                        <div className="flex mt-4">
                            <img
                                src="src/assets/img/momo.png"
                                alt="Momo"
                                className="w-16 h-16 object-contain mr-4"
                            />
                            <img
                                src="src/assets/img/vnpay.png"
                                alt="VNPay"
                                className="w-16 h-16 object-contain mr-4"
                            />
                            <img
                                src="src/assets/img/paypal.jpg"
                                alt="Paypal"
                                className="w-16 h-16 object-contain"
                            />
                        </div>

                        <label className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="bank"
                                checked={selectedOption === 'option2'}
                                onChange={() => setSelectedOption('option2')}
                                className="form-radio text-blue-600"
                            />
                            <span>Chuyển khoản ngân hàng</span>
                        </label>
                        <div className="pl-6">
                            <p>
                                Ngân hàng Vietcombank - CN Hải Hậu <br />
                                STK: 1022584075 <br />
                                CTK: PHAM THI THU LAN
                            </p>
                        </div>
                    </div>
                </div>

                {/* Nút thanh toán */}
                <div className="flex justify-center">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
                        <Link to="/end">THANH TOÁN</Link>
                    </button>
                </div>
            </div>

            {/* Tóm tắt đặt phòng */}
            <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg ml-8">
                <h2 className="text-lg font-bold mb-4">Tóm tắt đặt phòng</h2>
                {bookedRooms.map((room) => (
                    <div key={room.id} className="flex items-center mb-4 border-b pb-4">
                        <img
                            src={room.image}
                            alt={room.name}
                            className="w-20 h-20 object-cover rounded-lg mr-4"
                        />
                        <div className="flex flex-col">
                            <span className="font-medium">{room.name}</span>
                            <span className="text-gray-600 text-sm">{room.dates}</span>
                            <span className="text-gray-600 text-sm">{room.guests}</span>
                            <span className="text-blue-600 font-semibold mt-2">
                                {room.price.toLocaleString()} VND
                            </span>
                        </div>
                    </div>
                ))}
                <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold">Tổng tiền</h3>
                    <span className="text-xl font-bold text-blue-800">
                        {totalPrice.toLocaleString()} VND
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../config/axios';
import { PaymentContext } from '../../context/paymentCT';
import { toast } from 'react-toastify';

const Pay = () => {
    const paymentContext = useContext(PaymentContext);
    if (!paymentContext) { return <div>Loading...</div>; }
    const { bookedRooms, totalPrice } = paymentContext;

    const [formState, setFormState] = useState({
        lastName: '',
        firstName: '',
        phone: '',
        paymentMethod: 'MoMo', // Default to 'MoMo'
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };


    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookedRooms || bookedRooms.length === 0) {
            toast.error('Bạn phải chọn  phòng để thanh toán')

            return;
        }
        const errors: { [key: string]: string } = {};

        if (!formState.lastName.trim()) {
            errors.lastName = 'Họ không được để trống.';
        }

        if (!formState.firstName.trim()) {
            errors.firstName = 'Tên không được để trống.';
        }

        if (!/^\d{10,11}$/.test(formState.phone)) {
            errors.phone = 'Số điện thoại phải có 10-11 chữ số.';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});

        const formData = bookedRooms.map(room => {
            const [checkIn, checkOut] = room.dates.split(" - ");
            const [roomCount, guestCount] = room.guests.split(" - ");
            const totalGuests = parseInt(guestCount.split(" ")[0], 10);
            const quantity = parseInt(roomCount.split(" ")[0], 10);

            return {
                detail_room_id: room.id,
                check_in: checkIn,
                check_out: checkOut,
                adult: totalGuests,
                children: 0,
                quantity,
                method: formState.paymentMethod,
                firstname: formState.firstName,
                lastname: formState.lastName,
                phone: formState.phone,
            };
        });

        try {
            const payUrls = await Promise.all(
                formData.map(async (data) => {
                    console.log('Sending data:', JSON.stringify(data, null, 2));
    
                    const response = await api.post(`/api/payment/create`, data, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`
                        },
                    });
    
                    if (response.status === 200) {
                        console.log('Payment for room successful:', data.detail_room_id);
                        return response.data.payUrl; 
                    } else {
                        throw new Error('Payment failed');
                    }
                })
            );
    
            console.log('All payments completed successfully:', payUrls);
            alert('Thanh toán thành công!');
            paymentContext.resetPayment();
    
            if (payUrls[0]) {
                window.location.href = payUrls[0];
               
            }
            
        } catch (error) {
            console.error('Payment failed', error);
            alert('Thanh toán thất bại. Vui lòng thử lại.');
        }
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
                                className={`p-2 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg`}

                                type="text"
                                placeholder="Nhập họ"
                            />
                            {formErrors.lastName && <span className="text-red-500 text-sm">{formErrors.lastName}</span>}

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
                                className={`p-2 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg`}

                                type="text"
                                placeholder="Nhập tên"
                            /> {formErrors.firstName && <span className="text-red-500 text-sm">{formErrors.firstName}</span>}
                        </div>
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
                            className={`p-2 border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                            type="tel"
                            placeholder="Nhập số điện thoại"
                        />{formErrors.phone && <span className="text-red-500 text-sm">{formErrors.phone}</span>}
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
                                value="MoMo"
                                checked={formState.paymentMethod === 'MoMo'}
                                onChange={() => setFormState({ ...formState, paymentMethod: 'MoMo' })}
                                className="form-radio text-blue-600"
                            />
                            <span>Ví MOMO</span>
                            <img
                                src="src/assets/img/momo.png"
                                alt="Momo"
                                className="w-16 h-16 object-contain mr-4"
                            />
                        </label>
                        <label className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="VNPAY"
                                checked={formState.paymentMethod === 'VNPAY'}
                                onChange={() => setFormState({ ...formState, paymentMethod: 'VNPAY' })}
                                className="form-radio text-blue-600"
                            />
                            <span>Ví VNPAY</span>
                            <img
                                src="src/assets/img/vnpay.png"
                                alt="VNPay"
                                className="w-16 h-16 object-contain mr-4"
                            />
                        </label>
                        <label className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="QR"
                                checked={formState.paymentMethod === 'QR'}
                                onChange={() => setFormState({ ...formState, paymentMethod: 'QR' })}
                                className="form-radio text-blue-600"
                            />
                            <span>Mã QR</span>

                            <img
                                src="src/assets/img/QR2.jpg"
                                alt="QR"
                                className="w-16 h-16 object-contain mr-4"
                            />
                        </label>
                    </div>
                </div>

                {/* Nút thanh toán */}
                <div className="flex justify-center">
                    <button type='button'
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600"
                        onClick={handleSubmit}
                    >
                        THANH TOÁN
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

export default Pay;

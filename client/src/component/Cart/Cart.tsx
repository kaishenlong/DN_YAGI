import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
    const [cartRooms, setCartRooms] = useState([
        {
            id: 1,
            name: 'Grand Resort Sapa-Lào Cai',
            location: 'Sapa-Lào Cai',
            dates: '01/09/2024 - 10/09/2024',
            guests: '1 phòng - 4 người',
            price: 2000000,
            selected: false,
            image: 'src/assets/img/item/sapa/room1_960x760.jpeg',
        },
        {
            id: 2,
            name: 'Luxury Hotel Hanoi',
            location: 'Hà Nội',
            dates: '05/10/2024 - 15/10/2024',
            guests: '2 phòng - 6 người',
            price: 3500000,
            selected: false,
            image: 'src/assets/img/item/sapa/room1_960x760.jpeg',
        },
    ]);

    const toggleSelectRoom = (id: number) => {
        setCartRooms((prevRooms) =>
            prevRooms.map((room) =>
                room.id === id ? { ...room, selected: !room.selected } : room
            )
        );
    };

    const removeRoom = (id: number) => {
        setCartRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
    };

    const calculateTotalPrice = () => {
        return cartRooms
            .filter((room) => room.selected)
            .reduce((total, room) => total + room.price, 0);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-[170px]">
            <h1 className="text-2xl font-bold text-blue-800 mb-6">Giỏ hàng của bạn</h1>

            <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
                {cartRooms.map((room) => (
                    <div
                        key={room.id}
                        className="flex items-center justify-between border-b border-gray-300 py-4"
                    >
                         <input
                                type="checkbox"
                                checked={room.selected}
                                onChange={() => toggleSelectRoom(room.id)}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mb-4"
                            />
                        {/* Room Image */}
                        <div className="flex items-center w-1/4">
                            <img
                                src={room.image}
                                alt={room.name}
                                className="w-full h-auto rounded-lg shadow-md"
                            />
                        </div>

                        {/* Room Info */}
                        <div className="flex flex-col w-1/2 px-4">
                            <h6 className="font-bold text-lg text-gray-800">{room.name}</h6>
                            <span className="text-gray-600 text-sm">
                                <i className="fa-solid fa-location-dot"></i> {room.location} -{' '}
                                <Link to="/" className="text-blue-600 underline">
                                    Xem trên bản đồ
                                </Link>
                            </span>
                            <span className="text-gray-600 text-sm">{room.dates}</span>
                            <span className="text-gray-600 text-sm">{room.guests}</span>
                            <span className="text-blue-800 font-semibold mt-1">
                                {room.price.toLocaleString()} VND
                            </span>
                        </div>

                        {/* Actions: Checkbox + Delete */}
                        <div className="flex flex-col items-center">
                           
                            <button
                                onClick={() => removeRoom(room.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrash className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Total Price */}
                <div className="flex justify-between items-center mt-6 border-t border-gray-300 pt-4">
                    <span className="font-semibold text-gray-800 text-lg">Tổng tiền:</span>
                    <span className="text-blue-800 font-bold text-lg">
                        {calculateTotalPrice().toLocaleString()} VND
                    </span>
                </div>

                {/* Actions */}
                <div className="flex justify-end mt-6">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 mr-4">
                        <Link to="/checkout">Tiến hành đặt phòng</Link>
                    </button>
                    <button className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600">
                        Tiếp tục mua sắm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;

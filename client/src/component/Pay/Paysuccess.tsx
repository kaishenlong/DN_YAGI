import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccessPage = () => {
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

    // Thông tin người đặt và phương thức thanh toán (giả sử)
    const userInfo = {
        firstName: 'Nguyen',
        lastName: 'Van A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        paymentMethod: 'Ví điện tử MoMo',
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-[170px] px-4">
            <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Thông tin thanh toán thành công</h1>

                {/* Thông tin người đặt */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-4 text-center">Thông tin người đặt</h2>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-inner mx-auto w-full md:w-2/3 lg:w-1/2">
                        <p><strong>Họ và tên:</strong> {userInfo.firstName} {userInfo.lastName}</p>
                        <p><strong>Email:</strong> {userInfo.email}</p>
                        <p><strong>Số điện thoại:</strong> {userInfo.phone}</p>
                        <p><strong>Phương thức thanh toán:</strong> {userInfo.paymentMethod}</p>
                    </div>
                </section>

                {/* Thông tin đặt phòng */}
                <section className="mb-6">
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
                </section>

                {/* Hướng dẫn nhận và trả phòng */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-4">Hướng dẫn nhận và trả phòng</h2>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                        <h3 className="font-semibold text-blue-800">Nhận phòng</h3>
                        <p className="text-gray-700 mb-4">
                            - Thời gian nhận phòng: 14:00 - 22:00 <br />
                            - Vui lòng xuất trình giấy tờ tùy thân có ảnh khi nhận phòng. <br />
                            - Địa chỉ: [Địa chỉ khách sạn của bạn].
                        </p>

                        <h3 className="font-semibold text-blue-800">Trả phòng</h3>
                        <p className="text-gray-700">
                            - Thời gian trả phòng: Trước 12:00 <br />
                            - Vui lòng thông báo cho lễ tân ít nhất 30 phút trước khi trả phòng. <br />
                            - Khách sạn có dịch vụ giữ hành lý nếu bạn cần.
                        </p>
                    </div>
                </section>

                {/* Nút quay về trang chủ */}
                <div className="flex justify-center">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
                        <Link to="/">Quay về trang chủ</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;

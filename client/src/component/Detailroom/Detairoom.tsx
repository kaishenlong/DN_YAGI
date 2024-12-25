import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaTrash, FaHotel, FaBed, FaWifi, FaBath, FaChevronDown, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import CartContext from '../../context/cartCT'; // Đảm bảo import đúng
import { PaymentContext } from '../../context/paymentCT';
import { roomCT } from '../../context/roomCT';
import { IRoomsDetail, IType_Room } from '../../interface/room';
import { v4 as uuidv4 } from 'uuid';

const ServiceCard = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-md transition-transform hover:scale-105">
    <Icon className="text-[24px] text-blue-600" />
    <span className="text-[16px] text-blue-800 ml-3 font-medium">{label}</span>
  </div>
);

const RoomCounter = ({ label, value, increment, decrement }: { label: string; value: number; increment: () => void; decrement: () => void }) => (
  <div className="flex flex-col items-center mb-6">
    <label className="block text-[16px] font-semibold text-gray-700 mb-2">{label}</label>
    <div className="flex items-center gap-2">
      <button onClick={decrement} className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full flex items-center justify-center shadow-sm">
        <FaMinus />
      </button>
      <input type="number" value={value} readOnly className="w-16 text-center border border-gray-300 rounded-md text-lg font-semibold" />
      <button onClick={increment} className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full flex items-center justify-center shadow-sm">
        <FaPlus />
      </button>
    </div>
  </div>
);

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID phòng từ URL
  const { rooms, typeRoom } = useContext(roomCT);
  const paymentContext = useContext(PaymentContext); 
  const { addRoom } = paymentContext || { addRoom: () => {} }; // Kiểm tra context
  const { addToCart } = useContext(CartContext);
  const [roomDetail, setRoomDetail] = useState<IRoomsDetail | null>(null);
  const [roomTypeDetail, setRoomTypeDetail] = useState<IType_Room | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');

  useEffect(() => {
    if (id) {
      const room = rooms.find((room: IRoomsDetail) => room.id === parseInt(id));
      setRoomDetail(room || null);
      if (room) {
        const type = typeRoom.find((type: IType_Room) => type.id === room.room_id);
        setRoomTypeDetail(type || null);
      }
    }
  }, [id, rooms, typeRoom]);

  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [numRooms, setNumRooms] = useState(1);
  const totalGuests = adults + children * 0.5;

  const incrementRooms = () => {
    if (roomDetail && numRooms < roomDetail.available_rooms) {
      setNumRooms(numRooms + 1);
      setErrorMessage(null);
    } else {
      setErrorMessage(`Phòng này chỉ còn ${roomDetail?.available_rooms} phòng trống.`);
    }
  };

  const decrementRooms = () => {
    if (numRooms > 1) {
      setNumRooms(numRooms - 1);
      setErrorMessage(null);
    }
  };

  const increment = (setter: React.Dispatch<React.SetStateAction<number>>) => setter((prev) => prev + 1);
  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) => setter((prev) => (prev > 0 ? prev - 1 : 0));

  const calculateNights = (checkIn: string, checkOut: string): number => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
    return differenceInTime / (1000 * 3600 * 24);
  };

  const numberOfNights = checkInDate && checkOutDate ? calculateNights(checkInDate, checkOutDate) : 0;

  const handleAddToCart = async () => {
    if (roomDetail && checkInDate && checkOutDate) {
      const room = {
        cartItemId: uuidv4(),
        id: roomDetail.id,
        name: roomDetail.description,
        dates: `${checkInDate} - ${checkOutDate}`,
        guests: `${numRooms} phòng - ${totalGuests} người`,
        price: roomDetail.price * numRooms * numberOfNights,
        selected: false,
        image: roomDetail.image,
      };
      await addToCart(room);
      navigate('/cart');
    } else {
      setErrorMessage('Vui lòng chọn ngày check-in và check-out.');
    }
  };

  const handleAddToPay = () => {
    if (roomDetail && checkInDate && checkOutDate) {
      const room = {
        id: roomDetail.id,
        name: roomDetail.description,
        dates: `${checkInDate} - ${checkOutDate}`,
        guests: `${numRooms} phòng - ${totalGuests} người`,
        price: roomDetail.price * numRooms * numberOfNights,
        image: roomDetail.image,
      };
      addRoom(room);
      navigate('/pay');
    } else {
      setErrorMessage('Vui lòng chọn ngày check-in và check-out.');
    }
  };

  if (!roomDetail) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center py-[170px]">
      <div className="flex items-center justify-center w-full max-w-5xl px-6 py-4 bg-white shadow-md rounded-lg mb-6">
        <div className="absolute left-6">
          <Link className="text-blue-600 text-lg font-semibold hover:underline" to="/">
            Quay lại
          
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-blue-800 text-center">Thông tin chi tiết phòng</h1>
      </div>

      <main className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">{roomDetail.description}</h2>
        {roomTypeDetail && (
          <h3 className="text-lg text-center mb-4">Loại phòng: {roomTypeDetail.type_room} - Số giường: {roomTypeDetail.bed}</h3>
        )}
        {/* Room Gallery */}
        <section className="flex justify-center gap-4 mb-8">
          <img src={roomDetail.image} alt={`Room ${roomDetail.id}`} className="w-1/3 rounded-lg shadow-md hover:scale-105 transform transition-transform" />
        </section>

        {/* Services */}
        <section>
          <h2 className="text-xl font-bold text-center mb-4">Dịch vụ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <ServiceCard icon={FaHotel} label="15m²" />
            <ServiceCard icon={FaBed} label="Giường đơn" />
            <ServiceCard icon={FaWifi} label="Wifi miễn phí" />
            <ServiceCard icon={FaBath} label="Vòi sen và bồn tắm" />
            <ServiceCard icon={FaBath} label="Máy sấy" />
            <ServiceCard icon={FaBath} label="Đồ dùng vệ sinh cá nhân" />
          </div>
        </section>

        {/* Check-in/out */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-center mb-4">Check In-Out</h2>
          <div className="flex gap-4 justify-center">
            <input
              type="date"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-blue-500 text-gray-700"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
            <input
              type="date"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-blue-500 text-gray-700"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>
          <div className="text-center mt-2">
            {numberOfNights > 0 && (
              <p>{numberOfNights} đêm</p>
            )}
          </div>
        </section>

        {/* Room and Guest Selector */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-center mb-4">Số lượng phòng và người</h2>
          <div className="relative w-64 mx-auto">
            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              <span>{numRooms} phòng - {totalGuests} khách</span>
              <FaChevronDown />
            </div>
            {isOpen && (
              <div className="absolute bg-white mt-2 p-4 rounded-lg shadow-lg z-10">
                <RoomCounter label="Số phòng" value={numRooms} increment={incrementRooms} decrement={decrementRooms} />
                <RoomCounter label="Người lớn" value={adults} increment={() => increment(setAdults)} decrement={() => decrement(setAdults)} />
                <RoomCounter label="Trẻ em" value={children} increment={() => increment(setChildren)} decrement={() => decrement(setChildren)} />
                <button onClick={() => setIsOpen(false)} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600">
                  Xác nhận
                </button>
              </div>
            )}
            {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-8">
          <div className="flex justify-between items-center p-4 bg-gray-200 rounded-lg shadow-md">
            <span className="font-bold text-gray-700">GIÁ PHÒNG:</span>
            <span className="text-lg font-bold text-blue-700">{roomDetail.price} Đ/đêm</span>
          </div>
          <div className="mt-4 flex justify-between items-center bg-yellow-400 text-white p-4 rounded-lg shadow-md">
            <span className="text-lg font-bold">TỔNG TIỀN:</span>
            <span className="text-xl font-bold">{roomDetail.price * numRooms * numberOfNights} Đ</span>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-center">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600"
            onClick={handleAddToCart}
          >
            <FaShoppingCart />
            Thêm Vào Giỏ Hàng
          </button>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600"  onClick={handleAddToPay}>
            Đặt ngay
          </button>
        </div>
      </main>
    </div>
  );
};

export default RoomDetail;

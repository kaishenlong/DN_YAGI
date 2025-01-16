import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import api from "../config/axios";
import CartContext from "../../context/cartCT";

const CartPage = () => {
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.status === 200) {
          const transformedCart = response.data.carts.map((item: any) => ({
            cartItemId: item.id,
            name: `Phòng ${item.detail_room_id}`,
            dates: `${item.check_in} - ${item.check_out}`,
            guests: `Người lớn: ${item.adult}, Trẻ em: ${item.children}`,
            price: parseFloat(item.total_price),
            quantity: item.quantity,
            selected: false, // Thêm cờ "selected" mặc định là false
            image: item.detailrooms.image, // Bạn cần cung cấp đường dẫn hình ảnh mặc định hoặc API trả về
          }));
          setCart(transformedCart);
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchCart();
  }, [setCart]);

  const toggleSelectRoom = (cartItemId: string) => {
    setCart((prevCart) =>
      prevCart.map((room) =>
        room.cartItemId === cartItemId
          ? { ...room, selected: !room.selected }
          : room
      )
    );
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setCart((prevCart) =>
      prevCart.map((room) => ({ ...room, selected: !selectAll }))
    );
  };

  const calculateTotalPrice = () => {
    return cart
      .filter((room) => room.selected)
      .reduce((total, room) => total + room.price, 0);
  };

  const handleRemove = async (cartItemId: string) => {
    try {
      await removeFromCart(cartItemId); // Xóa phần tử khỏi API và cập nhật giỏ hàng
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      alert("Xóa sản phẩm khỏi giỏ hàng thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-[170px]">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Giỏ hàng của bạn
      </h1>

      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
            />
            Chọn tất cả
          </label>
        </div>

        {cart.map((room) => (
          <div
            key={room.cartItemId}
            className="flex items-center justify-between border-b border-gray-300 py-4"
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={room.selected || false}
              onChange={() => toggleSelectRoom(room.cartItemId)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mb-4"
            />

            {/* Room Image */}
            <div className="flex items-center w-1/4">
              <img
                src={`http://localhost:8000/storage/${room.image}`}
                alt={room.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Room Info */}
            <div className="flex flex-col w-1/2 px-4">
              <h6 className="font-bold text-lg text-gray-800">{room.name}</h6>
              <span className="text-gray-600 text-sm">{room.dates}</span>
              <span className="text-gray-600 text-sm">{room.guests}</span>
              <span className="text-blue-800 font-semibold mt-1">
                {room.price} VND
              </span>
            </div>

            {/* Remove Button */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleRemove(room.cartItemId)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6 border-t border-gray-300 pt-4">
          <span className="font-semibold text-gray-800 text-lg">
            Tổng tiền:
          </span>
          <span className="text-blue-800 font-bold text-lg">
            {calculateTotalPrice()} VND
          </span>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className={`px-6 py-3 rounded-lg shadow-md mr-4 ${
              cart.filter((item) => item.selected).length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={cart.filter((item) => item.selected).length === 0}
            onClick={() =>
              navigate("/paycart", {
                state: {
                  selectedCartItems: cart.filter((item) => item.selected),
                },
              })
            }
          >
            Tiến hành đặt phòng
          </button>

          <button className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600">
            <Link to={`/`} className="">
              Tiếp tục mua sắm
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

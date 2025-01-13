import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../config/axios";
import { toast } from "react-toastify";

interface CartItem {
  cartItemId: string;
  price: number;
  name?: string;
  image?: string;
  dates?: string;
  guests?: number;
}

const PayCart = () => {
  const location = useLocation();
  const [formState, setFormState] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    paymentMethod: "MoMo",
  });
  const selectedCartItems: CartItem[] = location.state?.selectedCartItems || [];
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const calculateTotalPrice = (): number => {
    return selectedCartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formState.lastName.trim()) errors.lastName = "Họ là bắt buộc.";
    if (!formState.firstName.trim()) errors.firstName = "Tên là bắt buộc.";
    if (!formState.email.trim()) {
      errors.email = "Email là bắt buộc.";
    } else if (!/\S+@\S+\.\S+/.test(formState.email.trim())) {
      errors.email = "Email không hợp lệ.";
    }
    if (!formState.phone.trim()) {
      errors.phone = "Số điện thoại là bắt buộc.";
    } else if (!/^\d{10,11}$/.test(formState.phone.trim())) {
      errors.phone = "Số điện thoại không hợp lệ.";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload = {
      cartIds: selectedCartItems.map((item) => item.cartItemId),
      method: formState.paymentMethod,
      firstname: formState.firstName,
      lastname: formState.lastName,
      email: formState.email,
      phone: formState.phone,
    };

    try {
      const response = await api.post(
        "/api/payment/pay-cart",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200 && response.data.payUrl) {
        toast.success("Chuyển hướng tới cổng thanh toán!");
        window.location.href = response.data.payUrl;
      } else {
        toast.error("Thanh toán thất bại. Vui lòng thử lại.");
      }
    } catch (error: any) {
      console.error("Thanh toán thất bại:", error);
      toast.error(
        error.response?.data?.message || "Thanh toán thất bại. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Thông tin thanh toán
        </h1>

        {/* Hiển thị danh sách sản phẩm */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">Danh sách phòng</h2>
          {selectedCartItems.map((item) => (
            <div key={item.cartItemId} className="flex items-center mb-4 border-b pb-4">
              <img
                src={item.image || "/path/to/default/image.jpg"}
                alt={item.name || "Phòng"}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex flex-col">
                <span className="font-medium">{item.name || "Tên phòng"}</span>
                {item.dates && <span className="text-gray-600 text-sm">{item.dates}</span>}
                {item.guests !== undefined && (
                  <span className="text-gray-600 text-sm">{item.guests} khách</span>
                )}
                <span className="text-blue-600 font-semibold mt-2">
                  {item.price.toLocaleString("vi-VN")} VND
                </span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form thông tin khách hàng */}
          <div className="mb-6">
            <label htmlFor="lastName" className="font-medium">
              Họ <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              value={formState.lastName}
              onChange={(e) =>
                setFormState({ ...formState, lastName: e.target.value })
              }
              className={`p-2 border ${
                formErrors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-lg w-full`}
              placeholder="Nhập họ"
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-sm">{formErrors.lastName}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="firstName" className="font-medium">
              Tên <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              value={formState.firstName}
              onChange={(e) =>
                setFormState({ ...formState, firstName: e.target.value })
              }
              className={`p-2 border ${
                formErrors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg w-full`}
              placeholder="Nhập tên"
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-sm">{formErrors.firstName}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              className={`p-2 border ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg w-full`}
              placeholder="Nhập email"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="font-medium">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={(e) =>
                setFormState({ ...formState, phone: e.target.value })
              }
              className={`p-2 border ${
                formErrors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg w-full`}
              placeholder="Nhập số điện thoại"
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm">{formErrors.phone}</p>
            )}
          </div>

          {/* Tổng tiền */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Tổng tiền</h3>
            <span className="text-xl font-bold text-blue-800">
              {calculateTotalPrice().toLocaleString("vi-VN")} VND
            </span>
          </div>

          {/* Phương thức thanh toán */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg">Phương thức thanh toán</h2>
            <div className="mt-4 space-y-4">
              {["MoMo", "VNPAY", "QR"].map((method) => (
                <label key={method} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formState.paymentMethod === method}
                    onChange={(e) =>
                      setFormState({ ...formState, paymentMethod: e.target.value })
                    }
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full"
          >
            THANH TOÁN
          </button>
        </form>
      </div>
    </div>
  );
};

export default PayCart;

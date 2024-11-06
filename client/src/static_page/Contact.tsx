import React from "react";
import { useState } from "react";
import { MapPin, Phone, Mail, Heart } from "lucide-react";

type Props = {};

const Contact = (props: Props) => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a server
  };
  return (
    <>
      <div className=" w-full">
        <div className="relative h-[300px]">
          <div
            style={{
              backgroundImage: 'url("src/upload/lienhe.jpeg")',
              backgroundSize: "cover",
              backgroundPosition: "0px",
            }}
            className="absolute w-full h-[399px] "
          >
            <p className="font-taviraj text-[61px]  italic font-extrabold  text-center mt-[150px] text-[#FFFFFF]">
              Liên hệ
            </p>
          </div>
        </div>
        <div className="content mt-[150px]">
          <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h1 className="font-taviraj text-[41px] font-bold text-[#ED9A1F] mb-4">
                Tổng Công ty Dịch vụ
                <br />
                Khách sạn YaGi
              </h1>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <MapPin className="text-blue-500" />
                  Trinh Van Bo, Xuan Phuong, Nam Tu Liem, Ha Noi
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="text-blue-500" />
                  0981822887
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="text-blue-500" />
                  infoyagi@gmail.com.vn
                </p>
              </div>
              <div className="mt-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <MapPin className="text-blue-500 w-12 h-64 mx-auto mb-2" />

                  <p className="text-center font-semibold">Show on Map</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">
                Nhập thông tin gửi liên hệ
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="lastName" className="block mb-1">
                      Họ *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="firstName" className="block mb-1">
                      Tên *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1">
                    Lời nhắn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border rounded"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Contact;

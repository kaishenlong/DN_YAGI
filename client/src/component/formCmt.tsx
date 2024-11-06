import React, { useState } from "react";

const FormCmt = () => {
  const [formData, setFormData] = useState({
    title: "",
    review: "",
    name: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex justify-start w-full">
      <div className="w-full max-w-[890px] bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          {/* Tiêu đề */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tiêu đề
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tiêu đề"
            />
          </div>

          {/* Đánh giá */}
          <div className="mb-4">
            <label
              htmlFor="review"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Đánh giá
            </label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Đánh giá"
            />
          </div>

          {/* Tên và Email */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tên"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
            </div>
          </div>

          {/* Gửi Button */}
          <div className="text-left">
            <button
              type="submit"
              className="bg-blue-500 w-full sm:w-[177px] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Gửi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCmt;

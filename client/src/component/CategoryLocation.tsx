import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CitiesCT } from "../context/cityCT";
import { City } from "../interface/hotel";

const CategoryLocation = () => {
  const { cities } = useContext(CitiesCT);

  const itemsPerPage = 9; // Số mục mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((cities?.length || 0) / itemsPerPage);

  // Dữ liệu hiển thị cho trang hiện tại
  const currentData = cities?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Chuyển đến trang trước
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Chuyển đến trang sau
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Chuyển đến một trang cụ thể
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4 p-4 mb-8 border border-gray-300 rounded-lg">
        {currentData && currentData.length > 0 ? (
          currentData.map((city: City) => (
            <div
              key={city.id}
              className="relative group shadow-lg transition-shadow duration-300 hover:shadow-2xl aspect-[2/1]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(http://localhost:8000/storage/${city.image})`,
                }}
              ></div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <Link
                to={`/CategoryCity/${city.id}`}
                className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold transition-transform duration-300 group-hover:scale-110"
              >
                {city.name}
              </Link>
            </div>
          ))
        ) : (
          <div className="py-4 px-6 text-center text-sm font-medium text-gray-900 dark:text-white">
            Không có dữ liệu
          </div>
        )}
      </div>

      {/* Điều hướng phân trang */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Trước
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default CategoryLocation;

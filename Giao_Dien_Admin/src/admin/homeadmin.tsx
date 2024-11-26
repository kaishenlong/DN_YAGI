import React from 'react';
import { FaUserCircle, FaRegListAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

interface HomeAdminProps {
  userName: string | null;
  onLogout: () => void; // Thêm prop onLogout
}

const HomeAdmin: React.FC<HomeAdminProps> = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await onLogout();
    navigate('/admin-login'); // Điều hướng sau khi đăng xuất
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 flex flex-col">
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to={'/dashboard'}>
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-black">Đặt Phòng YAGI</h6>
          </Link>
          <nav className="flex space-x-6">
            <div className="text-gray-700 hover:text-gray-900 flex items-center space-x-2">
              <FaUserCircle className="text-2xl" />
              <span>{userName || 'Account Info'}</span> {/* Hiển thị tên người dùng */}
            </div>
           
            <div className="text-gray-700 hover:text-gray-900 flex items-center space-x-2 cursor-pointer" onClick={handleLogoutClick}>
              <FaSignOutAlt className="text-2xl" />
              <span>Logout</span>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 text-center">Hello, Admin!</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 text-center">Welcome to your dashboard</p>
          <div className="flex justify-center">
           
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeAdmin;

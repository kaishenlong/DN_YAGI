import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  userName: string | null;
};

const AccountPopup: React.FC<Props> = ({ isOpen, onClose, onLogout, userName }) => {
  return (
    <div className={`absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg ${isOpen ? 'block' : 'hidden'}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-black font-bold">{userName || "Tài khoản"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            &times;
          </button>
        </div>
        <ul className="space-y-4">
          <li>
            <button className="w-full text-left py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Link to={'/userprofile'}> Thông tin tài khoản</Link>
            </button>
          </li>
          <li>
            <button className="w-full text-left py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Link to={'/history'}>Lịch sử đặt phòng</Link>  
            </button>
          </li>
          <li>
            <button className="w-full text-left py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Link to={'/Favorites'}> Danh sách yêu thích</Link>   
            </button>
          </li>
          <li className='ml-10'>
            <button onClick={() => { onLogout(); onClose(); }} className="w-[150px] py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountPopup;

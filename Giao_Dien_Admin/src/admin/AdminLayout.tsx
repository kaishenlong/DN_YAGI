import React from 'react';
import SlideBarAdmin from './SlideBarAdmin';

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-72">
        <SlideBarAdmin />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-72 p-4">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;

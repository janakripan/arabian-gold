import React from 'react';
import { useState } from "react";
import { Outlet } from "react-router";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full h-fit min-h-screen relative">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* content and headers */}
      <div
        className={`w-full h-screen overflow-hidden overflow-y-auto bg-gray-50 ${
          isOpen ? "lg:pl-[260px]" : "lg:pl-[80px]"
        }`}
      >
        <Header />

        <div id="detail" className="p-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

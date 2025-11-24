import React from 'react';
import { RiMenu2Fill, RiNotificationLine, RiUserLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiExit } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router";
import { childVariants, menuVariants } from '../animations';
import SearchBar from './shared/SearchBar';
import { navLinks } from '../constants';

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleClick = () => {
    setModalOpen(!modalOpen);
  };

  const Modal = () => {
    return (
      <div
        className={`w-[250px] h-fit p-2 absolute right-0 top-15 bg-white border-gray-200 shadow-lg rounded-lg transition-all duration-500 ${
          modalOpen
            ? "translate-y-0 opacity-100"
            : "-translate-32 opacity-0 pointer-events-none"
        }`}
      >
        <button className="text-red-500 flex gap-2 px-6 py-3 items-center w-full rounded-lg hover:bg-gray-100 transition-all duration-300">
          <BiExit /> Log Out
        </button>
      </div>
    );
  };

  const MobileMenu = () => {
    return (
      <motion.div
        key="mobile-menu"
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-11/12 md:w-1/2 h-screen overflow-hidden flex flex-col bg-gradient-to-br from-[#411F47] via-[#5A2E63] to-[#7E3D80] fixed top-0 right-0 backdrop-blur-3xl p-4 z-20"
      >
        <div className="w-full h-fit flex items-center justify-end p-4 relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
            }}
            className="rounded-lg p-1.5 flex items-center justify-center px-2 shadow-sm bg-white/5 text-white text-xl cursor-pointer mt-3 fixed"
          >
            <motion.div
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <MdOutlineClose />
            </motion.div>
          </button>
        </div>

        <div className="w-full h-full flex flex-col gap-y-6 overflow-hidden overflow-y-scroll">
          <div className="w-full h-fit grid grid-cols-2 gap-4">
            {navLinks.map((itm, idx) => {
              const Icon = itm.icon;
              return (
                <motion.div
                  key={idx}
                  variants={childVariants}
                  className="bg-white/10 text-white text-lg p-2 rounded-xl text-center shadow-md hover:bg-white/20 aspect-square transition flex flex-col items-center justify-center gap-2"
                  onClick={() => handleNavigation(itm.path)}
                >
                  <Icon className="text-[#D2AD6C]" />
                  <span>{itm.title}</span>
                </motion.div>
              );
            })}
          </div>

          {/* bottom details */}
          <div className="w-full h-fit min-h-[60px] mt-4 py-5 border-t border-[#FFFFFF1A]">
            <div className="bg-[#FFFFFF0D] rounded-lg flex flex-row py-4 px-3.5">
              {/* icon section */}
              <div className="rounded-full bg-[#D2AD6C] px-2.5 text-[#411F47] flex items-center justify-center">
                <RiUserLine />
              </div>
              <div className="flex flex-col items-start justify-center pl-3">
                <span className="text-white font-poppins font-normal text-[13.5px]">
                  Admin User
                </span>
                <span className="text-[#FFFFFF99] font-poppins font-normal text-[10.5px]">
                  admin@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full h-fit shadow shadow-[#0000000D] sticky top-0 border-b py-3.5 px-7 border-[#F3F4F6] bg-gradient-to-br from-[#411F47] via-[#5A2E63] to-[#7E3D80] lg:from-white lg:via-white lg:to-white backdrop-blur-2xl z-50">
      {/* Desktop header */}
      <div className="hidden w-full max-w-screen-xl mx-auto h-fit lg:flex flex-row items-center justify-between">
        {/* left side content */}
        <div className="flex flex-col items-start justify-center">
          <span className="font-semibold text-2xl font-poppins text-[#411F47]">
            Welcome Back, Admin
          </span>
          <span className="text-[12.5px] text-[#2A2A2AB2]">
            Tuesday, August 26, 2025
          </span>
        </div>

        {/* search bar and other contents */}
        <div className="w-fit h-full flex flex-row items-center gap-3.5">
          <div className="h-full md:w-[200px] lg:w-[250px]">
            <SearchBar />
          </div>
          <button className="text-[#4B5563] h-full w-fit p-2 flex items-center relative rounded-lg hover:bg-gray-100 transition-all duration-300">
            <RiNotificationLine className="text-xl" />
            <span className="bg-gradient-to-r from-[#DD8796] to-[#F9C5C5] rounded-full w-[20px] aspect-square absolute -top-1.25 -right-0.75 text-white text-sm">
              5
            </span>
          </button>

          <button
            onClick={handleClick}
            className="rounded-lg hover:bg-gray-100 transition-all duration-300 p-2 text-lg flex flex-row items-center gap-2 relative"
          >
            <div className="bg-[#411F47] w-9 h-9 text-white rounded-full flex items-center justify-center">
              <RiUserLine />
            </div>
          </button>
          <div className="text-[#4B5563]">
            {modalOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            <Modal />
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div className="lg:hidden w-full h-fit flex flex-row justify-center items-center px-4 p-2 relative">
        <div className="w-fit h-full">
          <img
            src="/assets/logo-text.svg"
            className="h-8/12 object-cover rounded-xl shadow-2xl mx-auto p-3 bg-white/5"
            alt="Arabian gold"
          />
        </div>

        {/* mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-1.5 flex items-center justify-center px-2 shadow-2xl bg-white/5 absolute right-0 text-white text-xl cursor-pointer"
        >
          <div
            className={`inline-block ${
              menuOpen ? "rotate-180" : "rotate-0"
            } transition-all duration-300`}
          >
            <RiMenu2Fill />
          </div>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {menuOpen && <MobileMenu />}
      </AnimatePresence>
    </div>
  );
};

export default Header;

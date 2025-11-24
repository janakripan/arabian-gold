import React from "react";
import logo from "/assets/logo-text.svg";
import { navLinks } from "../constants";
import { NavLink } from "react-router";
import { RiUserLine } from "react-icons/ri";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id="sidebar"
      className={`hidden lg:flex bg-[#411F47] fixed left-0 top-0 h-screen flex-col transition-all duration-300 ${
        isOpen ? "lg:w-[260px] w-0" : "w-0 lg:w-[80px]"
      }`}
    >
      {/* logo section */}
      <div className="w-full h-[115px] border-b border-[#FFFFFF1A] flex items-center justify-center">
        <img src={logo} alt="Logo" />
      </div>

      {/* nav section */}
      <div
        className={`w-full h-full flex flex-col justify-between transition-all duration-300 ${
          isOpen ? "px-4" : "px-3"
        }`}
      >
        <nav className="w-full h-fit flex flex-col gap-y-2 py-6">
          {navLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={idx}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `w-full h-fit overflow-hidden rounded-lg flex flex-row gap-3 items-center py-3 transition-all duration-300 ${
                    isActive
                      ? "bg-[#D2AD6C] text-[#411F47]"
                      : "bg-transparent text-white"
                  } ${isOpen ? "px-4" : "justify-center pl-3"}`
                }
              >
                {Icon && <Icon className="text-lg" />}
                <span
                  className={`text-base font-poppins transition-all duration-300 ${
                    isOpen ? "w-fit opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* bottom details */}
        <div className="w-full h-fit min-h-[60px] py-3.5 border-t border-[#FFFFFF1A]">
          <div className="bg-[#FFFFFF0D] rounded-lg flex flex-row py-2.5 px-3.5">
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
    </div>
  );
};

export default Sidebar;

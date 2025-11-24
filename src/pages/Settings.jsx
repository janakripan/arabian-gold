import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { TbSettings2 } from "react-icons/tb";
import GeneralSettings from "../components/settings/GeneralSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import SystemSettings from "../components/settings/SystemSettings";
import { IoWarningOutline } from "react-icons/io5";

const Settings = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-5  ">
      <div className="w-full h-fit flex flex-row justify-start items-center gap-10 ">
        {/* heading and description  */}
        <div>
          <h1 className="font-poppins font-semibold lg:text-3xl  text-2xl capitalize text-primary">
            Settings
          </h1>
          <p className="text-subText/70 text-[14px] font-normal font-poppins ">
            Configure system preferences and security settings
          </p>
        </div>
      </div>

      {/* settings  */}
      <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        {/* general settings  */}

        <GeneralSettings/>

        {/* notification settings  */}

        <NotificationSettings/>

        {/* security settings  */}
        <SecuritySettings/>

        {/* system settings  */}
        <SystemSettings/>
      </div>

      {/* danger zone  */}

      <div className="w-full bg-white h-fit flex flex-col shadow-[0px_1px_2px_0px_#0000000D] border border-[#F3F4F6] rounded-[12px] p-5.75 gap-5.5 ">

        {/* heading and icon */}
        <div className="flex flex-row gap-2.75 w-full h-fit items-center justify-start">

          {/* icon  */}
          <div className=" bg-[#FEE2E2] rounded-lg text-base p-2 text-[#DC2626] ">
            <IoWarningOutline />
          </div>

          <h3 className="font-semibold text-primary text-base ">
            Danger Zone
          </h3>

        </div>

        {/* export buttons  */}

        <div className="w-full h-fit flex flex-col gap-3.75 ">

          {/* export all data button  */}

          <div className="w-full h-fit flex flexrow justify-between items-center rounded-lg p-3.75 border border-[#FECACA] bg-[#FEF2F2] ">

              {/* heading and description  */}
            <div className="flex flex-col w-fit h-fit">
              <h5 className="text-[#7F1D1D] text-xs capitalize  ">
                Export All Data
              </h5>
              <p className="text-[#B91C1C] text-[10px]  ">
                Download a complete backup of all system data
              </p>


            </div>


            <button className="text-white text-[15px] capitalize hover:scale-105 active:scale-95 transition-all duration-200 py-2 px-4 rounded-lg bg-[#DC2626] ">
            Export Data
            </button>

          </div>



          {/* export all data button  */}

          <div className="w-full h-fit flex flexrow justify-between items-center rounded-lg p-3.75 border border-[#FECACA] bg-[#FEF2F2] ">

              {/* heading and description  */}
            <div className="flex flex-col w-fit h-fit">
              <h5 className="text-[#7F1D1D] text-xs capitalize  ">
                Reset System Settings
              </h5>
              <p className="text-[#B91C1C] text-[10px]  ">
                Reset all settings to their default values
              </p>


            </div>


            <button className="text-white text-[15px] capitalize hover:scale-105 active:scale-95 transition-all duration-200 py-2 px-4 rounded-lg bg-[#DC2626] ">
            reset settings
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Settings;

import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { LuClock3 } from "react-icons/lu";
import { RiFileList3Line } from "react-icons/ri";
import KycTable from "../components/kyc/KycTable";
const Kyc = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-5 ">
      {/* heading and description */}
      <div className="w-full h-fit flex flex-row justify-start items-center gap-10 ">
        
        <div>
          <h1 className="font-poppins font-semibold lg:text-3xl  text-2xl capitalize text-primary">
            KYC verification
          </h1>
          <p className="text-subText/70 text-[14px] font-normal font-poppins ">
            Review and verify customer identity documents
          </p>
        </div>
      </div>

      {/* Stat Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


        {/* card1  */}

        <div className="w-full h-fit border border-[#DEDFE1] shadow-xl hover:drop-shadow-2xl drop-shadow-[#0000000D] flex flex-row items-center gap-4 p-5.5 bg-white rounded-[8px] transition-all duration-300">
          {/* data section  */}

          <div className="w-full h-fit flex flex-col ">
            <p className="text-sm font-inter capitalize text-subText/70 font-medium ">
              total applications
            </p>
            <h3 className="font-bold font-poppins text-primary text-[24px] ">
              153
            </h3>

            <div className="flex gap-1 items-center">
              <span className="text-[12px] text-[#16A34A] font-poppins ">
                +6
              </span>
              <span className="text-[11px]  text-subText/50   ">this week</span>
            </div>
          </div>

          {/* icon  */}
          <div className="w-fit h-full flex items-center justify-center">
            <div className="text-white text-base bg-[#3B82F6] rounded-lg p-3 ">
              <RiFileList3Line />
            </div>
          </div>
        </div>

        {/* card2  */}

        <div className="w-full h-fit border border-[#DEDFE1] shadow-xl hover:drop-shadow-2xl drop-shadow-[#0000000D] flex flex-row items-center gap-4 p-5.5 bg-white rounded-[8px] transition-all duration-300">
          {/* data section  */}

          <div className="w-full h-fit flex flex-col ">
            <p className="text-sm font-inter capitalize text-subText/70 font-medium ">
              pending review
            </p>
            <h3 className="font-bold font-poppins text-primary text-[24px] ">
              46
            </h3>

            <div className="flex gap-1 items-center">
              <span className="text-[12px] text-[#16A34A] font-poppins ">
                +8
              </span>
              <span className="text-[11px]  text-subText/50   ">this week</span>
            </div>
          </div>

          {/* icon  */}
          <div className="w-fit h-full flex items-center justify-center">
            <div className="text-white text-base bg-[#EAB308] rounded-lg p-3 ">
              <LuClock3 />
            </div>
          </div>
        </div>



         {/* card3  */}

        <div className="w-full h-fit border border-[#DEDFE1] shadow-xl hover:drop-shadow-2xl drop-shadow-[#0000000D] flex flex-row items-center gap-4 p-5.5 bg-white rounded-[8px] transition-all duration-300">
          {/* data section  */}

          <div className="w-full h-fit flex flex-col ">
            <p className="text-sm font-inter capitalize text-subText/70 font-medium ">
              approved
            </p>
            <h3 className="font-bold font-poppins text-primary text-[24px] ">
              89
            </h3>

            <div className="flex gap-1 items-center">
              <span className="text-[12px] text-[#16A34A] font-poppins ">
                +20
              </span>
              <span className="text-[11px]  text-subText/50   ">this week</span>
            </div>
          </div>

          {/* icon  */}
          <div className="w-fit h-full flex items-center justify-center">
            <div className="text-white text-base bg-[#22C55E] rounded-lg p-3 ">
              <FaRegCheckCircle />
            </div>
          </div>
        </div>



         {/* card4  */}

        <div className="w-full h-fit border border-[#DEDFE1] shadow-xl hover:drop-shadow-2xl drop-shadow-[#0000000D] flex flex-row items-center gap-4 p-5.5 bg-white rounded-[8px] transition-all duration-300">
          {/* data section  */}

          <div className="w-full h-fit flex flex-col ">
            <p className="text-sm font-inter capitalize text-subText/70 font-medium ">
              rejected
            </p>
            <h3 className="font-bold font-poppins text-primary text-[24px] ">
              20
            </h3>

            <div className="flex gap-1 items-center">
              <span className="text-[12px] text-[#DC2626] font-poppins ">
                -3
              </span>
              <span className="text-[11px]  text-subText/50   ">this week</span>
            </div>
          </div>

          {/* icon  */}
          <div className="w-fit h-full flex items-center justify-center">
            <div className="text-white text-base bg-[#EF4444] rounded-lg p-3 ">
              <FaRegCircleXmark />
            </div>
          </div>
        </div>


      </div>


      {/* kyc Table */}
      <div className="w-full h-fit">
        <KycTable />
      </div>

    </div>
  );
};

export default Kyc;

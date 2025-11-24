import React from 'react'
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io'

const PaymentStatCard = ({title,amount,percentage,icon}) => {
    const Icon = icon
  return (
    <div className="w-full h-fit border border-[#DEDFE1] shadow-xl hover:drop-shadow-2xl drop-shadow-[#0000000D] flex flex-row items-center justify-between gap-4 p-5.5 bg-white rounded-[12px] transition-all duration-300">

        {/* data  */}

        <div>
            <p className='text-[12.5px] text-subText/70 font-poppins capitallize '>
                {title}
            </p>

            <h3 className='text-subText font-semibold text-[24px]  '>
                AED {amount}
            </h3>

            <p className='text-[12px] text-subText/70 flex flex-row gap-0.75 '>
                <span className={` flex flex-row text-[14px] items-center gap-0.5 ${percentage < 0 ? "text-[#EF4444]" : "text-[#16A34A]"}`}>
                    {percentage>0 ?(<IoIosArrowRoundUp size={16} />):(<IoIosArrowRoundDown size={16} />)} {percentage}%
                </span>  vs last month
            </p>
        </div>


        {/* icon  */}

        <div className='bg-[#411F471A] text-primary text-base p-4 rounded-lg '>
            <Icon/>
        </div>
      
    </div>
  )
}

export default PaymentStatCard

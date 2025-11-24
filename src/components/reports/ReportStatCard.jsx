import React from 'react'
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io'

const ReportStatCard =({title,amount,percentage,icon,duration,bg,text}) => {
    const Icon = icon
  return (
    <div className="w-full h-fit border border-[#DEDFE1] shadow-xl hover:drop-shadow-2xl drop-shadow-[#0000000D] flex flex-col  justify-between gap-4 p-5.5 bg-white rounded-[12px] transition-all duration-300">

        {/* data  */}
        
        <div className='w-full h-fit flex flex-row justify-between items-center'>


            <div>
            <p className='text-[12.5px] text-subText/70 font-poppins capitallize '>
                {title}
            </p>

            <h3 className='text-subText font-semibold text-[24px]  '>
                {amount}
            </h3>

            
        </div>


        {/* icon  */}

        <div className={`${bg} ${text} text-base p-4 rounded-lg`}>
            <Icon/>
        </div>

        </div>
        




        <p className='text-[12px] text-subText/70 flex flex-row items-center gap-0.75 '>
                <div className={`  flex flex-row text-[12px] items-center gap-0.5 p-1 px-1.75 rounded-full ${percentage < 0 ? "text-[#DC2626] bg-[#FEE2E2]" : "text-[#16A34A] bg-[#DCFCE7]"}`}>
                    {percentage>0 ?( "+" ):("")} {percentage}%
                </div>  {duration}
            </p>
      
    </div>
  )
}

export default ReportStatCard

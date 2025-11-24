import React from 'react'
import NotificationStatCard from '../components/notification/NotificationStatCard'
import { RiNotification2Line, RiNotificationBadgeLine } from 'react-icons/ri'
import { TbLocation } from 'react-icons/tb'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import NotificationTable from '../components/notification/NotificationTable'

const Notifications = () => {
  return (
   <div className="w-full h-full flex flex-col gap-y-5">
      {/* Heading  */}
      <div className="w-full h-fit flex flex-row justify-between items-center gap-10">
        {/* Heading and Description */}
        <div>
          <h1 className="font-poppins font-semibold lg:text-3xl text-2xl capitalize text-primary">
            notifications
          </h1>
          <p className="text-subText/70 text-[14px] font-normal font-poppins">
            Manage and track all system notifications
          </p>
        </div>

       
      </div>

      {/* Stat Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


        <NotificationStatCard
          title={"Total Notification"}
          amount={3242}
          percentage={18}
          icon={RiNotification2Line}
          duration={"vs last month"}
          bg={"bg-[#F3E8FF]"}
          text={"text-primary"}
        />

        <NotificationStatCard
          title={"Unread"}
          amount={89}
          percentage={-5}
          icon={RiNotificationBadgeLine}
          duration={"vs yesterday"}
          bg={"bg-[#FEE2E2]"}
          text={"text-[#DC2626]"}
        />
        <NotificationStatCard
          title={"sent today"}
          amount={156}
          percentage={12}
          icon={TbLocation}
          duration={"vs last week"}
          bg={"bg-[#DBEAFE]"}
          text={"text-[#2563EB]"}
        />
        <NotificationStatCard
          title={"open rate"}
          amount={"87%"}
          percentage={3}
          icon={MdOutlineRemoveRedEye}
          duration={"vs last week"}
          bg={"bg-[#DCFCE7]"}
          text={"text-[#16A34A]"}
        />


      </div>


      {/* notification Table */}
      <div className="w-full h-fit">
        <NotificationTable />
      </div>


    </div>
  )
}

export default Notifications

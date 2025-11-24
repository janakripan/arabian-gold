
import React from 'react';
import { FiFileText, FiPlus } from "react-icons/fi";
import UserStatCard from "../components/users/UserStatCard";
import UserTable from '../components/users/UserTable';
import AddUserModal from '../components/users/AddUserModal';
import { useUsers } from '../contexts/UserContext';
import { RiUserLine, RiUserStarLine, RiVerifiedBadgeLine } from 'react-icons/ri';
import { Loader } from '../utils/Loader';

const Users = () => {

  const {statData, isPending,isLoading} = useUsers()


  const userStatData = [
  {
    title:"total users" ,
    data:statData?.totalUsers,
    icon:RiUserLine,
    percentage: 12,
    color:"#411F47",
  },{
    title:"Active users" ,
    data:statData?.activeUsers,
    icon:RiUserStarLine,
    percentage: 8,
    color:"#411F47",
  },
  {
    title:"pending kyc" ,
    data:statData?.pendingKYC,
    icon:FiFileText,
    percentage: -15,
    color:"#DD8796",
  },
  {
    title:"verified users" ,
    data:statData?.verifiedUsers,
    icon:RiVerifiedBadgeLine,
    percentage: 18,
    color:"#10B981",
  },
]
if(isPending|| isLoading)
  return(
<div className='w-full h-full flex items-center justify-center'>

   <Loader/>

</div>
)
  return (
    <div className="w-full h-full flex flex-col gap-y-5">
      {/* Heading and Add User Button */}
      <div className="w-full h-fit flex flex-row justify-start items-center gap-10">
        {/* Heading and Description */}
        <div>
          <h1 className="font-poppins font-semibold lg:text-3xl text-2xl capitalize text-primary">
            user management
          </h1>
          <p className="text-subText/70 text-[14px] font-normal font-poppins">
            Manage customer accounts, KYC verification, and user activities
          </p>
        </div>

        {/* Add User Button */}
        {/* <button
          className="flex gap-1.75 items-center justify-center text-white bg-golden rounded-lg px-5.5 py-2.75 capitalize md:text-sm text-xl relative group hover:scale-103 transition-all duration-300 overflow-hidden active:scale-95"
          onClick={handleAddClick}
        >
          <div className="h-[80px] w-1/4 absolute rotate-45 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-30 group-hover:translate-x-35 transition-all duration-500" />
          <FiPlus /> <span className="hidden md:block">add new user</span>
        </button> */}
      </div>

      {/* Stat Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {userStatData.map((item, index) => (
          <UserStatCard key={index} item={item} />
        ))}
      </div>

      {/* User Table */}
      <div className="w-full h-fit">
        <UserTable />
      </div>

      {/* Add User Modal */}
      {/* {addUser && (
        <div className="fixed inset-0 backdrop-blur-3xl z-50 flex items-center justify-center px-4">
          <AddUserModal setAddUser={setAddUser} />
        </div>
      )} */}
    </div>
  );
};

export default Users;

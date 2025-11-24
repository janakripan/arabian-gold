import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import AddSchemeModal from '../components/schemes/AddSchemeModal';
import SchemesTable from '../components/schemes/SchemesTable';

const Schemes = () => {

   const [addScheme, setAddScheme] = useState(false);
  
    const handleAddClick = () => {
      setAddScheme(!addScheme);
    };
  
    useEffect(() => {
      if (addScheme) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
  
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [addScheme]);

  return (
    <div className="w-full h-full flex flex-col gap-y-5">

      {/* Heading and Add Scheme Button */}
            <div className="w-full h-fit flex flex-row justify-between items-center gap-10">
              {/* Heading and Description */}
              <div>
                <h1 className="font-poppins font-semibold lg:text-3xl text-2xl capitalize text-primary">
                  scheme management
                </h1>
                <p className="text-subText/70 text-[14px] font-normal font-poppins">
                  Manage and monitor all gold savings schemes
                </p>
              </div>
      
              {/* Add Scheme Button */}
              <button
                className="flex gap-1.75 items-center justify-center text-white bg-golden rounded-lg px-5.5 py-2.75 capitalize md:text-sm text-xl relative group hover:scale-103 transition-all duration-300 overflow-hidden active:scale-95"
                onClick={handleAddClick}
              >
                <div className="h-[80px] w-1/4 absolute rotate-45 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-30 group-hover:translate-x-35 transition-all duration-500" />
                <FiPlus /> <span className="hidden md:block">add new scheme</span>
              </button>
            </div>



             {/* scheme Table */}
      <div className="w-full h-fit">
        <SchemesTable />
      </div>

      {/* Add scheme Modal */}
      {addScheme && (
        <div className="fixed inset-0 backdrop-blur-3xl z-50 flex items-center justify-center px-4">
          <AddSchemeModal setAddScheme={setAddScheme} />
        </div>
      )}
      
    </div>
  )
}

export default Schemes

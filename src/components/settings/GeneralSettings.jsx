import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { TbSettings2 } from "react-icons/tb";

const GeneralSettings = () => {
  const [edit, setEdit] = useState(false);

  const initialvalues = {
    companyName: "AGD Gold & Diamonds",
    companyEmail: "admin@agdgold.com",
    timeZone: "kolkatta/asia",
    dateFormat: "dd/mm/yyyy",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form data:", values);
    resetForm();
  };
  return (
    <div className="w-full h-fit flex flex-col  gap-5.5 rounded-xl bg-white border border-[#F3F4F6] shadow-[0px_1px_2px_0px_#0000000D] p-5.5 ">
      {/* heading and edit button */}
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <div className="w-fit h-full flex flex-row items-center gap-2.75">
          {/* icon  */}
          <div className="text-primary text-base bg-[#F3E8FF] p-1.5 rounded-lg md:w-9 aspect-square flex items-center justify-center">
            <TbSettings2 />
          </div>

          <h2 className="capitalize font-semibold text-base text-primary font-poppins">
            general settings
          </h2>
        </div>

        <button
          className={`flex flex-row items-center gap-2 py-2 px-4 rounded-lg border border-primary transition-all duration-200  text-sm ${
            edit ? " bg-primary text-white" : " text-primary"
          } `}
          onClick={() => setEdit(!edit)}
        >
          <AiOutlineEdit />
          {""}Edit
        </button>
      </div>

      {/* settings form  */}

      <Formik initialValues={initialvalues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-5.5">

            {/* company name  */}
            <div className="w-full h-fit flex md:flex-row flex-col md:justify-between gap-2">
              {/* label and description  */}
              <div className="flex flex-col items-start">
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]  ">
                  company name
                </h4>
                <p className="text-[10px] text-[#6B7280] ">
                  The name of your organization
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end">
                <Field type="text" name="companyName" placeholder="Enter your company name"
                disabled={!edit}
                className={`bg-[#F9FAFB] py-2 px-3 rounded-lg w-full  text-black text-[12.5px] border border-[#E5E7EB] focus:outline-none disabled:text-gray-700 `}
                 />

                  <ErrorMessage
                name="companyName"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
              </div>
            </div>


            {/* ncompany email  */}
            <div className="w-full h-fit flex md:flex-row flex-col md:justify-between gap-2">
              {/* label and description  */}
              <div className="flex flex-col items-start">
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]  ">
                  company email
                </h4>
                <p className="text-[10px] text-[#6B7280] ">
                  Primary contact email address
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end">
                <Field type="text" name="companyEmail" placeholder="Enter your company email"
                disabled={!edit}
                className={`bg-[#F9FAFB] py-2 px-3 rounded-lg w-full  text-black text-[12.5px] border border-[#E5E7EB] focus:outline-none disabled:text-gray-700 `}
                 />

                  <ErrorMessage
                name="companyEmail"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
              </div>
            </div>

            {/* time zone  */}
            <div className="w-full h-fit flex md:flex-row flex-col md:justify-between gap-2">
              {/* label and description  */}
              <div className="flex flex-col items-start">
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]  ">
                  time zone
                </h4>
                <p className="text-[10px] text-[#6B7280] ">
                  Default timezone for the system
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end">
                <Field type="text" name="timeZone" placeholder="Enter system time zone"
                disabled={!edit}
                className={`bg-[#F9FAFB] py-2 px-3 rounded-lg lg:max-w-3/4 w-full  text-black text-[12.5px] border border-[#E5E7EB] focus:outline-none disabled:text-gray-700 `}
                 />

                  <ErrorMessage
                name="timeZone"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
              </div>
            </div>



            {/* date format  */}
            <div className="w-full h-fit flex md:flex-row flex-col md:justify-between gap-2">
              {/* label and description  */}
              <div className="flex flex-col items-start">
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]  ">
                  date format
                </h4>
                <p className="text-[10px] text-[#6B7280] ">
                  How dates should be displayed
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end">
                <Field type="text" name="dateFormat" placeholder="Enter date format"
                disabled={!edit}
                className={`bg-[#F9FAFB] py-2 px-3 lg:max-w-3/5 rounded-lg w-full  text-black text-[12.5px] border border-[#E5E7EB] focus:outline-none disabled:text-gray-700 `}
                 />

                  <ErrorMessage
                name="dateFormat"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GeneralSettings;

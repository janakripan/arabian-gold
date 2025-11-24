import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { AiOutlineEdit } from "react-icons/ai";
import { RiShieldCheckLine } from "react-icons/ri";

const SecuritySettings = () => {
  const [edit, setEdit] = useState(false);

  const initialValues = {
    twoFactorAuth: true,
    sessionTimeout: "30",
    strongPassword: true,
    maxLoginAttempts: 5,
  };

  const handleSubmit = (values) => {
    console.log("Security settings:", values);
  };

  return (
    <div className="w-full h-fit flex flex-col gap-5.5 rounded-xl bg-white border border-[#F3F4F6] shadow-[0px_1px_2px_0px_#0000000D] p-5.5">
      {/* heading and edit button */}
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <div className="w-fit h-full flex flex-row items-center gap-2.75">
          {/* icon */}
          <div className="text-primary text-base bg-[#F3E8FF] p-1.5 rounded-lg md:w-9 aspect-square flex items-center justify-center">
            <RiShieldCheckLine />
          </div>

          <h2 className="capitalize font-semibold text-base text-primary font-poppins">
            security settings
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setEdit(!edit)}
          className={`flex flex-row items-center gap-2 py-2 px-4 rounded-lg border border-primary text-sm transition-all duration-200 ${
            edit ? "bg-primary text-white" : "text-primary"
          }`}
        >
          <AiOutlineEdit />
          Edit
        </button>
      </div>

      {/* form */}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">

            {/* Two-Factor Authentication */}
            <div className="w-full flex md:flex-row flex-col md:justify-between gap-2">
              <div>
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]">
                  two-factor authentication
                </h4>
                <p className="text-[10px] text-[#6B7280]">
                  Require 2FA for admin accounts
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end items-center pb-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={values.twoFactorAuth}
                    disabled={!edit}
                    onChange={() =>
                      setFieldValue("twoFactorAuth", !values.twoFactorAuth)
                    }
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary transition-all duration-300 ${
                      !edit ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  ></div>
                  <span
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5`}
                  ></span>
                </label>
              </div>
            </div>

            {/* Session Timeout */}
            <div className="w-full flex md:flex-row flex-col md:justify-between gap-2">
              <div>
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]">
                  session timeout
                </h4>
                <p className="text-[10px] text-[#6B7280]">
                  Automatically log out inactive users
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end">
                <Field
                  as="select"
                  name="sessionTimeout"
                  disabled={!edit}
                  className={`bg-[#F9FAFB] py-2 px-3 rounded-lg lg:max-w-3/4 w-full text-black text-[12.5px] border border-[#E5E7EB] focus:outline-none appearance-none disabled:text-gray-700`}
                >
                  <option value="15">15 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="45">45 Minutes</option>
                  <option value="60">1 Hour</option>
                </Field>
              </div>
            </div>

            {/* Strong Password Policy */}
            <div className="w-full flex md:flex-row flex-col md:justify-between gap-2">
              <div>
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]">
                  strong password policy
                </h4>
                <p className="text-[10px] text-[#6B7280]">
                  Enforce strong password requirements
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end items-center pb-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="strongPassword"
                    checked={values.strongPassword}
                    disabled={!edit}
                    onChange={() =>
                      setFieldValue("strongPassword", !values.strongPassword)
                    }
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary transition-all duration-300 ${
                      !edit ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  ></div>
                  <span
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5`}
                  ></span>
                </label>
              </div>
            </div>

            {/* Max Login Attempts */}
            <div className="w-full flex md:flex-row flex-col md:justify-between gap-2">
              <div>
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]">
                  max login attempts
                </h4>
                <p className="text-[10px] text-[#6B7280]">
                  Block account after failed attempts
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end">
                <Field
                  type="number"
                  name="maxLoginAttempts"
                  disabled={!edit}
                  min="0"
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") e.preventDefault();
                  }}
                  onWheel={(e) => e.target.blur()}
                  className={`bg-[#F9FAFB] py-2 px-3 rounded-lg lg:max-w-3/4 w-full text-black text-[12.5px] border border-[#E5E7EB] focus:outline-none disabled:text-gray-700  [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SecuritySettings;

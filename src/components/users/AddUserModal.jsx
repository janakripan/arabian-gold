import React from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Select from "react-select";
import ToggleSwitch from "../Shared/ToggleSwitch";
import { FiPlus } from "react-icons/fi";

const kycOptions = [
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
  { value: "verified", label: "Verified" },
];

const AddUserModal = ({ setAddUser }) => {
  const [kycStatus, setKycStatus] = useState("pending");

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    address: "",
    city: "",
    state: "",
    kycStatus: "",
    pinCode: "",
    isActive: true,
    notes: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form submitted with values:", values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    resetForm();
    setSubmitting(false);
  };

  const handleCancelClick = (resetForm) => {
    setAddUser(false);
    resetForm();
  };

  return ( 
    <div className="w-full max-w-[786px] h-[98vh] lg:max-h-[90vh] flex flex-col rounded-[24px] bg-[#F5F5F5] relative overflow-hidden overflow-y-auto">
      {/* Header */}
      <div className="w-full h-fit flex flex-row justify-between items-center shadow-lg shadow-[#00000040] p-5.5 gap-2.5 bg-primary sticky top-0 text-[#F1F1F1] text-3xl">
        <h2>Add New User</h2>
        <button
          onClick={() => setAddUser(false)}
          className="flex items-center justify-center rounded-full text-4xl"
        >
          <IoIosCloseCircleOutline />
        </button>
      </div>

      {/* Form */}
      <div className="w-full h-fit lg:h-[680px] overflow-hidden overflow-y-auto p-5.5">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue, isSubmitting, resetForm }) => (
            <Form className="w-full h-fit flex flex-col gap-4">
              <div className="w-full h-fit flex flex-col md:flex-row gap-4">
                {/* Personal Info */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                  <h4 className="font-bold text-xl text-black leading-snug">
                    Personal Information
                  </h4>

                  <div className="w-full flex flex-col bg-white border border-[#8C8C8C] rounded-[24px] p-3.5 gap-5">
                    {/* Full Name */}
                    <div className="flex flex-col">
                      <label htmlFor="fullName" className="text-lg font-medium">
                        Enter Full Name
                      </label>
                      <Field
                        name="fullName"
                        placeholder="Enter Full Name"
                        className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-lg font-medium">
                        Enter Email Address
                      </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter E-Mail"
                        className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                      <label htmlFor="phone" className="text-lg font-medium">
                        Enter Phone Number
                      </label>
                      <Field
                        type="text"
                        name="phone"
                        placeholder="Enter Phone Number"
                        className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col">
                      <label htmlFor="address" className="text-lg font-medium">
                        Enter Address
                      </label>
                      <Field
                        as="textarea"
                        name="address"
                        placeholder="Enter Address"
                        rows={4}
                        className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                  <h4 className="font-bold text-xl text-black">
                    Additional Details
                  </h4>

                  <div className="w-full flex flex-col bg-white border border-[#8C8C8C] rounded-[24px] p-3.5 gap-5">
                    {/* City & State */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col">
                        <label htmlFor="city" className="text-lg font-medium">
                          City
                        </label>
                        <Field
                          name="city"
                          placeholder="City"
                          className="border w-full border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="state" className="text-lg font-medium">
                          State
                        </label>
                        <Field
                          name="state"
                          placeholder="State"
                          className="border w-full border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                        />
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    {/* Pin Code */}
                    <div className="flex flex-col">
                      <label htmlFor="pinCode" className="text-lg font-medium">
                        Pin Code
                      </label>
                      <Field
                        type="number"
                        name="pinCode"
                        placeholder="Pin Code"
                        min="0"
                        className="border w-full border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none appearance-none"
                      />
                      <ErrorMessage
                        name="pinCode"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* KYC Status */}
                    <div className="w-full h-fit">
                      <label htmlFor="kycStatus" className="text-lg font-medium">
                        KYC Status
                      </label>
                      <Select
                        inputId="kycStatus"
                        name="kycStatus"
                        value={kycOptions.find((o) => o.value === kycStatus)}
                        onChange={(option) =>
                          setKycStatus(option?.value || "pending")
                        }
                        options={kycOptions}
                        isSearchable={false}
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            display: "inline-flex",
                            width: "100%",
                            borderRadius: "8px",
                            borderColor: "#E5E7EB",
                            paddingLeft: "17px",
                            paddingRight: "17px",
                            fontSize: "14px",
                            paddingTop: "9px",
                            paddingBottom: "9px",
                          }),
                          dropdownIndicator: (provided) => ({
                            ...provided,
                            color: "#9CA3AF",
                            width: "16px",
                          }),
                          indicatorSeparator: () => ({ display: "none" }),
                        }}
                      />
                      <ErrorMessage
                        name="kycStatus"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Toggle */}
                    <div className="flex flex-col">
                      <ToggleSwitch
                        name="isActive"
                        label="Account Active Status"
                        checked={values.isActive}
                        onChange={(checked) =>
                          setFieldValue("isActive", checked)
                        }
                        activeColor="bg-emerald-500"
                        inactiveColor="bg-gray-300"
                      />
                    </div>

                    {/* Notes */}
                    <div className="flex flex-col">
                      <label htmlFor="notes" className="text-lg font-medium">
                        Notes
                      </label>
                      <Field
                        name="notes"
                        placeholder="Add Notes About This Person"
                        className="border w-full border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                      />
                      <ErrorMessage
                        name="notes"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-row items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => handleCancelClick(resetForm)}
                  className="flex gap-1.75 items-center justify-center text-red-500 bg-white rounded-lg px-5.5 py-2.75 capitalize md:text-sm text-xl border border-[#ACACAC] font-semibold hover:scale-103 active:scale-95 transition-all duration-300"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex gap-1.75 items-center justify-center text-white bg-golden rounded-lg px-5.5 py-2.75 capitalize md:text-sm text-xl relative group transition-all duration-300 overflow-hidden ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-103 active:scale-95"
                  }`}
                >
                  <div className="h-[80px] w-1/4 absolute rotate-45 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-30 group-hover:translate-x-35 transition-all duration-500" />
                  <FiPlus />
                  <span className="hidden md:block">
                    {isSubmitting ? "Submitting..." : "Add New User"}
                  </span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUserModal;

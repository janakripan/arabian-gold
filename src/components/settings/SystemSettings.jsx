import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { AiOutlineEdit } from "react-icons/ai";
import { CgDatabase } from "react-icons/cg";

const SystemSettings = () => {
  const [edit, setEdit] = useState(false);

  const initialValues = {
    maintenanceMode: false,
    debugMode: false,
    backupFrequency: "daily",
    dataRetention: "30 days",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("System settings:", values);
    resetForm();
  };

  return (
    <div className="w-full h-fit flex flex-col gap-5.5 rounded-xl bg-white border border-[#F3F4F6] shadow-[0px_1px_2px_0px_#0000000D] p-5.5">
      {/* heading and edit button */}
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <div className="w-fit h-full flex flex-row items-center gap-2.75">
          {/* icon */}
          <div className="text-primary text-base bg-[#F3E8FF] p-1.5 rounded-lg md:w-9 aspect-square flex items-center justify-center">
            <CgDatabase />
          </div>

          <h2 className="capitalize font-semibold text-base text-primary font-poppins">
            system settings
          </h2>
        </div>

        <button
          className={`flex flex-row items-center gap-2 py-2 px-4 rounded-lg border border-primary transition-all duration-200 text-sm ${
            edit ? "bg-primary text-white" : "text-primary"
          }`}
          onClick={() => setEdit(!edit)}
        >
          <AiOutlineEdit />
          Edit
        </button>
      </div>

      {/* settings form */}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Maintenance Mode */}
            <div className="w-full flex md:flex-row flex-col md:justify-between gap-2">
              <div>
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]">
                  maintenance mode
                </h4>
                <p className="text-[10px] text-[#6B7280]">
                  Put the system in maintenance mode
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end items-center pb-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={values.maintenanceMode}
                    disabled={!edit}
                    onChange={() =>
                      setFieldValue(
                        "maintenanceMode",
                        !values.maintenanceMode
                      )
                    }
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 bg-gray-200 rounded-full peer 
                    peer-checked:bg-primary transition-all duration-300
                    ${!edit ? "opacity-70 cursor-not-allowed" : ""}`}
                  ></div>
                  <span
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 
                    peer-checked:translate-x-5`}
                  ></span>
                </label>
              </div>
            </div>

            {/* Debug Mode */}
            <div className="w-full flex md:flex-row flex-col md:justify-between gap-2">
              <div>
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]">
                  debug mode
                </h4>
                <p className="text-[10px] text-[#6B7280]">
                  Enable debug logs for troubleshooting
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end items-center pb-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="debugMode"
                    checked={values.debugMode}
                    disabled={!edit}
                    onChange={() =>
                      setFieldValue("debugMode", !values.debugMode)
                    }
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 bg-gray-200 rounded-full peer 
                    peer-checked:bg-primary transition-all duration-300
                    ${!edit ? "opacity-70 cursor-not-allowed" : ""}`}
                  ></div>
                  <span
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 
                    peer-checked:translate-x-5`}
                  ></span>
                </label>
              </div>
            </div>

            {/* Backup Frequency */}
            <div className="w-full flex md:flex-row flex-col md:justify-between gap-2">
              <div>
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]">
                  backup frequency
                </h4>
                <p className="text-[10px] text-[#6B7280]">
                  How often to create system backups
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end">
                <Field
                  as="select"
                  name="backupFrequency"
                  disabled={!edit}
                  className={`bg-[#F9FAFB] py-2 px-3 rounded-lg lg:max-w-3/4 w-full text-black text-[12.5px] border border-[#E5E7EB] focus:outline-none appearance-none disabled:text-gray-700`}
                  style={{ backgroundImage: "none" }} // removes dropdown arrow
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </Field>
              </div>
            </div>

            {/* Data Retention Period */}
            <div className="w-full flex md:flex-row flex-col md:justify-between gap-2">
              <div>
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]">
                  data retention period
                </h4>
                <p className="text-[10px] text-[#6B7280]">
                  How long to keep user data and logs
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end">
                <Field
                  as="select"
                  name="dataRetention"
                  disabled={!edit}
                  className={`bg-[#F9FAFB] py-2 px-3 rounded-lg lg:max-w-3/4 w-full text-black text-[12.5px] border border-[#E5E7EB] focus:outline-none appearance-none disabled:text-gray-700`}
                  style={{ backgroundImage: "none" }} // removes dropdown arrow
                >
                  <option value="30 days">30 Days</option>
                  <option value="60 days">60 Days</option>
                  <option value="90 days">90 Days</option>
                  <option value="1 year">1 Year</option>
                </Field>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SystemSettings;

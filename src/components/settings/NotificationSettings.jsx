import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineEdit } from "react-icons/ai";
import { RiNotification4Line } from "react-icons/ri";

const NotificationSettings = () => {
  const [edit, setEdit] = useState(false);

  const initialValues = {
    emailNotification: true,
    smsNotification: false,
    pushNotification: true,
    notificationFrequency: "daily",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Notification settings:", values);
    resetForm();
  };

  return (
    <div className="w-full h-fit flex flex-col gap-5.5 rounded-xl bg-white border border-[#F3F4F6] shadow-[0px_1px_2px_0px_#0000000D] p-5.5">
      {/* heading and edit button */}
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <div className="w-fit h-full flex flex-row items-center gap-2.75">
          {/* icon */}
          <div className="text-primary text-base bg-[#F3E8FF] p-1.5 rounded-lg md:w-9 aspect-square flex items-center justify-center">
            <RiNotification4Line />
          </div>

          <h2 className="capitalize font-semibold text-base text-primary font-poppins">
            notification settings
          </h2>
        </div>

        <button
          className={`flex flex-row items-center gap-2 py-2 px-4 rounded-lg border border-primary transition-all duration-200 text-sm ${
            edit ? "bg-primary text-white" : "text-primary"
          }`}
          onClick={() => setEdit(!edit)}
        >
          <AiOutlineEdit />
          {""}Edit
        </button>
      </div>

      {/* settings form */}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">

            {/* Email Notification */}
            <div className="w-full h-fit flex md:flex-row flex-col md:justify-between gap-2">
              <div className="flex flex-col items-start">
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]">
                  email notifications
                </h4>
                <p className="text-[10px] text-[#6B7280]">
                  Send email notifications for important events
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end items-center pb-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailNotification"
                    checked={values.emailNotification}
                    disabled={!edit}
                    onChange={() =>
                      setFieldValue(
                        "emailNotification",
                        !values.emailNotification
                      )
                    }
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
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

            {/* SMS Notification */}
            <div className="w-full h-fit flex md:flex-row flex-col md:justify-between gap-2">
              <div className="flex flex-col items-start">
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]">
                  sms notifications
                </h4>
                <p className="text-[10px] text-[#6B7280]">
                  Send SMS notifications for urgent alerts
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end items-center pb-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="smsNotification"
                    checked={values.smsNotification}
                    disabled={!edit}
                    onChange={() =>
                      setFieldValue("smsNotification", !values.smsNotification)
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

            {/* Push Notification */}
            <div className="w-full h-fit flex md:flex-row flex-col md:justify-between gap-2 ">
              <div className="flex flex-col items-start">
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]">
                  push notifications
                </h4>
                <p className="text-[10px] text-[#6B7280]">
                  Send push notifications to mobile devices
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end items-center pb-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="pushNotification"
                    checked={values.pushNotification}
                    disabled={!edit}
                    onChange={() =>
                      setFieldValue(
                        "pushNotification",
                        !values.pushNotification
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

            {/* Notification Frequency */}
            <div className="w-full h-fit flex md:flex-row flex-col md:justify-between gap-2">
              <div className="flex flex-col items-start">
                <h4 className="capitalize text-[#111827] font-poppins text-[12px]">
                  notification frequency
                </h4>
                <p className="text-[10px] text-[#6B7280]">
                  How often to send digest notifications
                </p>
              </div>

              <div className="w-full md:max-w-1/2 flex justify-end">
                <Field
                  as="select"
                  name="notificationFrequency"
                  disabled={!edit}
                  className={`bg-[#F9FAFB] py-2 px-3 rounded-lg lg:max-w-3/4 w-full text-black text-[12.5px] border border-[#E5E7EB] focus:outline-none appearance-none  disabled:text-gray-700`}
                >
                  
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </Field>

                <ErrorMessage
                  name="notificationFrequency"
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

export default NotificationSettings;

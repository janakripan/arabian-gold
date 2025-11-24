import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosCloseCircleOutline } from "react-icons/io";
import { userData } from "../../constants";
import FileDropzone from "../shared/FileDropZone";
import { FiPlus } from "react-icons/fi";
import * as Yup from "yup";

const AddManuelPaymen = ({ setAddPayment }) => {
  const [users, setUsers] = useState(userData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const initialvalues = {
    userName: "",
    scheme: "",
    amountPaid: "",
    month: "",
    paymentMethod: "cash",
    proof: null,
    recipt: "",
    remarks: "",
  }

    // ✅ FIX 1: variable names corrected
  const initialValues = {
    userName: "",
    scheme: "",
    amountPaid: "",
    month: "",
    paymentMethod: "cash",
    proof: null,
    recipt: "",
    remarks: "",
  };

  // ✅ FIX 2: proper validation schema definition
  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("User name is required")
      .min(3, "Must be at least 3 characters"),
    scheme: Yup.string().nullable(),
    amountPaid: Yup.number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .positive("Amount must be positive"),
    month: Yup.string().nullable(),
    paymentMethod: Yup.string().required("Payment method is required"),
    proof: Yup.mixed()
      .nullable()
      .test("fileRequired", "Please upload a proof (image or PDF)", (value) => !!value)
      .test(
        "fileType",
        "Only images (JPG, PNG) or PDF files are allowed",
        (value) => {
          if (!value) return true;
          return (
            ["image/jpeg", "image/png", "application/pdf"].includes(value.type) ||
            Array.isArray(value)
          );
        }
      ),
    recipt: Yup.string()
      .required("Receipt or reference number is required")
      .min(3, "Too short"),
    remarks: Yup.string()
      .max(300, "Remarks cannot exceed 300 characters")
      .nullable(),
  });

  // ✅ FIX 3: correct handleSubmit syntax
  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted:", values);
    resetForm();
  };

  //   search logic

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers([]);
      setShowDropdown(false);
      return;
    }

    const results = users.filter((u) =>
      u.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
    setShowDropdown(results.length > 0);
  }, [searchTerm, users]);

   const handleCancelClick = (resetForm) => {
    setAddPayment(false);
    resetForm();
  };

  return (
    <div className="w-full max-w-[786px] h-[98vh] lg:max-h-[90vh] flex flex-col rounded-[24px] bg-[#F5F5F5] relative overflow-hidden overflow-y-auto">
      {/* Header */}
      <div className="w-full h-fit flex flex-row justify-between items-center shadow-lg shadow-[#00000040] p-5.5 gap-2.5 bg-primary sticky top-0 text-[#F1F1F1] text-3xl">
        <h2>Add Manual Payment</h2>
        <button
          onClick={() => setAddPayment(false)}
          className="flex items-center justify-center rounded-full text-4xl"
        >
          <IoIosCloseCircleOutline />
        </button>
      </div>

      {/* Form */}
      <div className="w-full h-fit lg:h-[680px] overflow-hidden overflow-y-auto p-5.5">
        <Formik
        initialValues={initialvalues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
          {({  setFieldValue, isSubmitting, resetForm }) => (
            <Form className="w-full h-fit flex flex-col gap-4    ">
              <div className="w-full h-fit flex flex-col gap-4 border border-[#8C8C8C] rounded-3xl p-3.5 bg-white">
                {/* user and scheme */}
                <div className="w-full flex flex-col md:flex-row gap-4">
                  {/* username  */}
                  <div className="flex flex-col md:w-7/12 relative">
                    <label
                      htmlFor="userName"
                      className="text-lg font-medium capitalize"
                    >
                      Search user
                    </label>
                    <Field
                      name="userName"
                      placeholder="Enter Full Name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border border-[#404040] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                      autoComplete="off"
                    />
                    {/* Dropdown results */}
                    {showDropdown && (
                      <div className="absolute top-10 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                        {filteredUsers.map((user) => (
                          <div
                            key={user.id}
                            onClick={() => {
                              setSearchTerm(user.userName);
                              setFieldValue("userName", user.userName);
                              setShowDropdown(false);
                            }}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                          >
                            {user.userName}
                          </div>
                        ))}
                      </div>
                    )}
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* scheme  */}
                  <div className="flex flex-col md:w-5/12">
                    <label
                      htmlFor="scheme"
                      className="text-lg font-medium capitalize text-[#ADAEBC]"
                    >
                      scheme
                    </label>
                    <Field
                      name="scheme"
                      placeholder="Joined Scheme"
                      className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25  focus:outline-none text-center "
                      disabled
                    />
                    <ErrorMessage
                      name="scheme"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* amount paid and payment month  */}

                <div className="w-full md:w-7/12 flex flex-col md:flex-row gap-4 ">
                  {/* amount Paid  */}
                  <div className="flex flex-col w-full md:w-1/2">
                    <label
                      htmlFor="amountPaid"
                      className="text-lg font-medium capitalize text-primary"
                    >
                      amount Paid AED
                    </label>
                    <Field
                      name="amountPaid"
                      placeholder="200 AED"
                      className="border border-[#404040] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25  focus:outline-none text-center "
                    />
                    <ErrorMessage
                      name="amountPaid"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* month  */}
                  <div className="flex flex-col w-full md:w-6/12">
                    <label
                      htmlFor="month"
                      className="text-lg font-medium capitalize text-[#ADAEBC]"
                    >
                      payment month
                    </label>
                    <Field
                      name="month"
                      placeholder="February"
                      className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25  focus:outline-none text-center "
                      disabled
                    />
                    <ErrorMessage
                      name="month"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/*payment method and proof */}

                <div className="w-full md:w-7/12 flex flex-col md:flex-row gap-4 ">
                  {/* payment method  */}
                  <div className="flex flex-col w-full md:w-1/2 relative">
                    <label
                      htmlFor="paymentMethod"
                      className="text-lg font-medium capitalize text-primary"
                    >
                      Payment Method
                    </label>

                    <div className="relative">
                      {/* select field */}
                      <Field
                        as="select"
                        name="paymentMethod"
                        className="appearance-none border  border-[#404040] text-[#111827] text-sm rounded-lg p-2.5 focus:outline-none  bg-white w-full pr-10"
                      >
                        <option value="cash">Cash</option>
                        <option value="card">Card</option>
                        <option value="bankTransfer">Bank Transfer</option>
                        <option value="cheque">Cheque</option>
                      </Field>

                      {/* custom arrow positioned closer to center */}
                      <IoIosArrowDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-lg" />
                    </div>

                    <ErrorMessage
                      name="paymentMethod"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Upload proof */}
                  <div className="flex flex-col w-full md:w-1/2">
                    <label
                      htmlFor="proof"
                      className="text-lg font-medium capitalize text-primary"
                    >
                      Upload Proof
                    </label>
                    <Field name="proof" component={FileDropzone} />
                    <ErrorMessage
                      name="proof"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* reciept/reference  */}
                <div className="flex flex-col w-full md:w-1/4">
                  <label
                    htmlFor="recipt"
                    className="text-lg font-medium capitalize text-primary"
                  >
                    reciept/reference
                  </label>
                  <Field
                    name="recipt"
                    placeholder="200 AED"
                    className="border border-[#404040] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25  focus:outline-none text-center "
                  />
                  <ErrorMessage
                    name="recipt"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex flex-col w-full ">
                  <label
                    htmlFor="remarks"
                    className="text-lg font-medium capitalize text-primary"
                  >
                    Remarks
                  </label>

                  <Field
                    as="textarea"
                    name="remarks"
                    placeholder="Enter any additional comments..."
                    rows="4"
                    className="border border-[#404040] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.5 focus:outline-none bg-white text-[#111827] resize-none"
                  />

                  <ErrorMessage
                    name="remarks"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
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
                    {isSubmitting ? "Submitting..." : "Add Payment"}
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

export default AddManuelPaymen;

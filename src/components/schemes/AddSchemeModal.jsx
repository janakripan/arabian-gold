import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Select from "react-select";
import { FiPlus } from "react-icons/fi";
import { AddSchemeValidationSchema } from "../../validations";
import { usePostScheme } from "../../api/hooks";
import { useQueryClient } from "@tanstack/react-query";
import ImageDropzone from "../shared/ImageDropzone";

const periodOption = [
  { value: 3, label: "3 Months" },
  { value: 6, label: "6 Months" },
  { value: 12, label: "12 Months" },
  { value: 18, label: "18 Months" },
  { value: 24, label: "24 Months" },
];

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Auto EMI calculation
const AutoCalculateEMI = () => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    const total = Number(values.totalAmount);
    const monthsCount = Number(values.schemePeriodMonths);

    if (!monthsCount) return;

    // Case 1: All months same
    if (values.isSameEveryMonth && total > 0) {
      const monthly = Math.round(total / monthsCount);
      const singleMonth = {
        monthNumber: monthsCount,
        monthName: "",
        amount: monthly,
      };

      setFieldValue("months", [singleMonth]);
      return;
    }

    // Case 2: Different EMI each month
    const newMonths = Array.from({ length: monthsCount }).map((_, index) => ({
      monthNumber: index + 1,
      monthName: monthName[index % 12],
      amount: values.months?.[index]?.amount || "",
    }));

    setFieldValue("months", newMonths);
  }, [
    values.schemePeriodMonths,
    values.isSameEveryMonth,
    values.totalAmount,
    setFieldValue,
  ]);

  return null;
};

const AddSchemeModal = ({ setAddScheme }) => {
  const { mutate: addScheme, isPending, isError } = usePostScheme();
  const queryClient = useQueryClient();

  const initialValues = {
    schemeName: "",
    schemePeriodMonths: 0,
    totalAmount: 0,
    isSameEveryMonth: true,
    months: [],
    bonusAmount: 0,
    description: "",
    membershipNominee: "",
    kycClosingRules: "",
    termsConditions: "",
    scheme_ImageURL:"",
  };

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log("SUBMITTED VALUES:", JSON.stringify(values, null, 2));

    let payload = { ...values };

    if (values.isSameEveryMonth) {
      payload.months = [
        {
          monthNumber: 1,
          monthName: "",
          amount: Number(
            Math.round(values.totalAmount / values.schemePeriodMonths)
          ),
        },
      ];
    } else {
      payload.months = values.months.map((m, i) => ({
        monthNumber: i + 1,
        monthName: m.monthName,
        amount: Number(m.amount),
      }));
    }

    addScheme(payload, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["getScheme"] });
        console.log(res);
        resetForm();
        setSubmitting(false);
      },
      onError: (err) => {
        console.error("Failed to add scheme:", err);
        setSubmitting(false);
      },
    });
  };

  const handleCancelClick = (resetForm) => {
    setAddScheme(false);
    resetForm();
  };

  return (
    <div className="w-full max-w-[786px] h-[98vh] lg:max-h-[90vh] flex flex-col rounded-[24px] bg-[#F5F5F5] relative overflow-hidden overflow-y-auto">
      {/* Header */}
      <div className="w-full h-fit flex flex-row justify-between items-center shadow-lg shadow-[#00000040] p-5.5 gap-2.5 bg-primary sticky top-0 text-[#F1F1F1] text-3xl">
        <h2>Add New Scheme</h2>
        <button
          onClick={() => setAddScheme(false)}
          className="flex items-center justify-center rounded-full text-4xl"
        >
          <IoIosCloseCircleOutline />
        </button>
      </div>

      <div className="w-full h-fit lg:h-[680px] overflow-y-auto p-5.5">
        <Formik
          initialValues={initialValues}
          validationSchema={AddSchemeValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            setFieldValue,
            isSubmitting,
            resetForm,
            errors,
            touched,
          }) => {
            const periodMonths = parseInt(values.schemePeriodMonths) || 0;
            console.log("Formik Errors:", errors);
            console.log("Touched Fields:", touched);

            return (
              <Form className="w-full h-fit flex flex-col gap-5.5">
                {/* Auto Calculation */}
                <AutoCalculateEMI />

                <div className="w-full flex flex-col gap-5.5 bg-white border border-[#8C8C8C] rounded-[24px] p-3.5">

                  <div className="w-full h-fit  flex lg:flex-row flex-col gap-5 ">

                    {/* Scheme Name */}
                  <div className="flex w-full lg:w-8/12 flex-col">
                    <label
                      htmlFor="schemeName"
                      className="text-lg font-medium capitalize text-primary"
                    >
                      Enter Scheme Name
                    </label>
                    <Field
                      name="schemeName"
                      placeholder="Enter Full Name"
                      className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                    />
                    <ErrorMessage
                      name="schemeName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className=" w-5/12 h-full flex flex-col">
                   <label
                      htmlFor="scheme_ImageURL"
                      className="text-lg font-medium capitalize text-primary"
                    >
                      Upload File (scheme logo)
                    </label>
                    <ImageDropzone name="scheme_ImageURL" imageClassification={"scheme"} />

                  </div>

                  </div>

                  {/* Scheme Period */}
                  <div className="flex flex-col w-1/4">
                    <label
                      htmlFor="schemePeriodMonths"
                      className="text-lg font-medium capitalize text-primary"
                    >
                      Scheme Period
                    </label>

                    <Select
                      id="schemePeriodMonths"
                      name="schemePeriodMonths"
                      options={periodOption}
                      value={periodOption.find(
                        (option) =>
                          Number(option.value) === values.schemePeriodMonths
                      )}
                      onChange={(option) =>
                        setFieldValue(
                          "schemePeriodMonths",
                          Number(option?.value) || ""
                        )
                      }
                      placeholder="Select Period"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          borderRadius: "8px",
                          borderColor: "#D1D5DB",
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          fontSize: "14px",
                          boxShadow: "none",
                        }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          color: "#000000",
                        }),
                        indicatorSeparator: () => ({ display: "none" }),
                      }}
                    />
                    <ErrorMessage
                      name="schemePeriodMonths"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Total Amount */}
                  <div className="flex flex-col w-full md:w-1/4">
                    <label
                      htmlFor="totalAmount"
                      className="text-lg font-medium capitalize text-primary"
                    >
                      Total Amount
                    </label>
                    <Field
                      type="number"
                      min={0}
                      name="totalAmount"
                      placeholder="Enter Amount"
                      className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                    />
                    <ErrorMessage
                      name="totalAmount"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center gap-3 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Field
                        type="checkbox"
                        name="isSameEveryMonth"
                        checked={values.isSameEveryMonth}
                        onChange={() =>
                          setFieldValue(
                            "isSameEveryMonth",
                            !values.isSameEveryMonth
                          )
                        }
                        className="appearance-none w-4 h-4 rounded-sm bg-white checked:bg-[#2C2C2C] border border-[#2C2C2C] flex items-center justify-center checked:before:content-['✓'] checked:before:text-white checked:before:text-sm"
                      />
                      <span className="text-sm text-[#1E1E1E]">
                        Every month’s the same amount
                      </span>
                    </label>
                  </div>

                  {/* Different EMI Each Month */}
                  {!values.isSameEveryMonth &&
                    Number(values.schemePeriodMonths) > 0 && (
                      <div className="flex flex-col gap-3 mt-3">
                        <div className="flex flex-row w-full h-fit overflow-x-auto border border-[#DDDDDD] bg-[#F4F4F4] gap-3 p-2.5 rounded-xl">
                          {Array.from({
                            length: Number(values.schemePeriodMonths),
                          }).map((_, i) => (
                            <div
                              key={i}
                              className="flex flex-col min-w-[100px]"
                            >
                              <label className="text-xs text-primary mb-1">
                                {monthName[i % 12].slice(0, 3)}
                              </label>
                              <Field
                                name={`months.${i}.amount`}
                                placeholder="Amount"
                                className="border w-full border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-[12px] text-[12px] rounded-lg px-2.25 py-1 focus:outline-none"
                              />
                              {console.log(values)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Bonus Amount */}
                  <div className="flex flex-col w-full md:w-1/4">
                    <label
                      htmlFor="bonusAmount"
                      className="text-lg font-medium capitalize text-primary"
                    >
                      Bonus Amount
                    </label>
                    <Field
                      type="number"
                      min={0}
                      name="bonusAmount"
                      placeholder="Enter Amount"
                      className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                    />
                    <ErrorMessage
                      name="bonusAmount"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Rules */}
                  <h4 className="font-bold text-black text-[24px]">
                    Scheme Rules & Regulations
                  </h4>

                  <div className="w-full h-fit flex flex-col gap-y-4 rounded-2xl border border-[#DDDDDD] p-3">
                    {/* Description */}
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="description"
                        className="text-lg font-medium text-[15px] capitalize text-[#000000] mb-2"
                      >
                        Scheme Description
                      </label>
                      <Field
                        as="textarea"
                        rows={4}
                        name="description"
                        placeholder="Enter Amount"
                        className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Membership & Nominee */}
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="membershipNominee"
                        className="text-lg font-medium text-[15px] capitalize text-[#000000] mb-2"
                      >
                        Membership & Nominees
                      </label>
                      <Field
                        as="textarea"
                        rows={3}
                        name="membershipNominee"
                        placeholder="Enter Amount"
                        className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                      />
                      <ErrorMessage
                        name="membershipNominee"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* KYC & Closing */}
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="kycClosingRules"
                        className="text-lg font-medium text-[15px] capitalize text-[#000000] mb-2"
                      >
                        KYC & Closing Rules
                      </label>
                      <Field
                        as="textarea"
                        rows={4}
                        name="kycClosingRules"
                        placeholder="Enter Amount"
                        className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                      />
                      <ErrorMessage
                        name="kycClosingRules"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="termsConditions"
                        className="text-lg font-medium text-[15px] capitalize text-[#000000] mb-2"
                      >
                        Terms & Conditions
                      </label>
                      <Field
                        as="textarea"
                        rows={4}
                        name="termsConditions"
                        placeholder="Enter Amount"
                        className="border border-[#D1D5DB] placeholder:text-[#ADAEBC] placeholder:text-sm rounded-lg p-2.25 focus:outline-none"
                      />
                      <ErrorMessage
                        name="termsConditions"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
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
                    disabled={isSubmitting || isPending}
                    className={`flex gap-1.75 items-center justify-center text-white bg-golden rounded-lg px-5.5 py-2.75 capitalize md:text-sm text-xl relative group transition-all duration-300 overflow-hidden ${
                      isSubmitting || isPending
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-103 active:scale-95"
                    }`}
                  >
                    <div className="h-[80px] w-1/4 absolute rotate-45 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-30 group-hover:translate-x-35 transition-all duration-500" />
                    <FiPlus />

                    <span className="hidden md:block">
                      {isSubmitting ? "Submitting..." : "Save As New Schema"}
                    </span>
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddSchemeModal;

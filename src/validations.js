import * as Yup from "yup";

export const AddSchemeValidationSchema = Yup.object().shape({
  schemeName: Yup.string()
    .required("Scheme name is required")
    .min(3, "Minimum 3 characters"),

  schemePeriodMonths: Yup.number()
    .required("Scheme period is required")
    .oneOf([3, 6, 12, 18, 24], "Invalid scheme period"),

  totalAmount: Yup.number()
    .required("Total amount is required")
    .min(1, "Amount must be greater than 0"),

  isSameEveryMonth: Yup.boolean(),

  months: Yup.array().when("isSameEveryMonth", (isSame, schema) => {
    if (isSame) {
      return schema
        .of(
          Yup.object().shape({
            monthNumber: Yup.number().required(),
            monthName: Yup.string().nullable(),
            amount: Yup.number()
              .required("Amount is required")
              .min(1, "Amount must be greater than 0"),
          })
        )
        
    }

    return schema
      .of(
        Yup.object().shape({
          monthNumber: Yup.number().required(),
          monthName: Yup.string().required(),
          amount: Yup.number()
            .required("Amount is required")
            .min(1, "Amount must be greater than 0"),
        })
      )
      
  }),

  bonusAmount: Yup.number().min(0, "Value cannot be negative").nullable(),

  description: Yup.string()
    .required("Scheme description is required")
    .min(10, "Description must be at least 10 characters"),

  membershipNominee: Yup.string()
    .required("Membership & nominees information required")
    .min(5, "Minimum 5 characters"),

  kycClosingRules: Yup.string()
    .required("KYC & closing rules required")
    .min(5, "Minimum 5 characters"),

  termsConditions: Yup.string()
    .required("Terms & conditions required")
    .min(5, "Minimum 5 characters"),

  scheme_ImageURL: Yup.string()
    .url("Invalid image URL"),
});

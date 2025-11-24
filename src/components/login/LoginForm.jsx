import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useUserLogin } from "../../api/hooks";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useRefetchContext } from "../../contexts/RefetchContext";


const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string().required("Password is required"),
  // .min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const [credError, SetCredError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { mutate:handleLogin, isLoading } = useUserLogin();

  const {refetchAll} = useRefetchContext()

  const handleSubmit = (values, { setSubmitting }) => {
    handleLogin(values, {
      onSuccess: (response) => {
        const userData = response.data;
        console.log(userData);

        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("refreshToken", userData.refreshToken);

        localStorage.setItem("user", JSON.stringify(userData.user));
        
        refetchAll()
        navigate("/dashboard");
      },
      onError: (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            SetCredError("invalid username or password");
          } else {
            SetCredError(
              error.response.data.message || "login failed . please try again"
            );
          }
        } else if (error.request) {
          // The request was made but no response was received
          SetCredError("Network error. Please check your connection.");
        } else {
          // Something happened in setting up the request that triggered an Error
          SetCredError("An error occurred. Please try again later.");
        }
        setSubmitting(false);
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Username */}
            <div className="relative">
              <Field
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Username"
                className="peer w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-[#7E3D80] focus:outline-none transition-all duration-200 placeholder-transparent text-sm"
              />
              <label
                htmlFor="username"
                className="absolute left-3 -top-2 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#7E3D80] peer-focus:bg-white"
              >
                Username
              </label>
              <ErrorMessage
                name="username"
                component="div"
                className="text-xs text-red-500 mt-1"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Field
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                className="peer w-full px-3 py-2.5 pr-10 border-2 border-gray-200 rounded-lg bg-gray-50 
               focus:bg-white focus:border-[#7E3D80] focus:outline-none 
               transition-all duration-200 placeholder-transparent text-sm"
              />

              {/* Eye Button */}
              <button
                type="button"
                className="absolute right-3 top-3 text-lg text-[#A7A7A7]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>

              <label
                htmlFor="password"
                className="absolute left-3 -top-2 bg-white px-1 text-xs font-medium text-gray-600 
               transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
               peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent
               peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#7E3D80] peer-focus:bg-white"
              >
                Password
              </label>

              <ErrorMessage
                name="password"
                component="div"
                className="text-xs text-red-500 mt-1"
              />
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-xs from-primary via-[#5A2E63] to-[#7E3D80] font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-linear-to-r from-primary via-[#5A2E63] to-[#7E3D80] text-white py-2.5 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting || isLoading ? "Logging in..." : "Login"}
            </button>
            {credError && <p className="text-xs text-red-500  ">{credError}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;

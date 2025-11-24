import React from 'react';
import LoginForm from "../components/login/LoginForm";

const Login = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="flex h-3/5 flex-row items-center justify-center w-full max-w-[900px] rounded-xl shadow-lg overflow-hidden">
        {/* left side logo and heading */}
        <div className="hidden h-full lg:flex lg:w-1/2 relative bg-linear-to-br from-primary via-[#5A2E63] to-[#7E3D80] items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center text-white/70 px-4">
            <img
              src="/assets/logo-text.svg"
              className="w-8/12 h-full object-cover rounded-xl shadow-2xl mb-4 mx-auto p-3 bg-white/5"
              alt="Arabian gold"
            />
            <h2 className="text-xl font-bold mb-2">
              Welcome to Arabian Gold & Diamonds
            </h2>
          </div>
        </div>

        {/* login form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-4 lg:p-8">
          <div className="max-w-xs mx-auto w-full space-y-4">
            <div className="text-center mb-6">
              <img
                alt="Arabian Gold Logo"
                className="h-10 mx-auto mb-2"
                src="/assets/AGD-logo 2.svg"
              />
              <h1 className="text-xl font-bold text-gray-900 mb-1">Sign In</h1>
              {/* <p className="text-gray-600 text-xs">
                Access your medical records dashboard
              </p> */}
            </div>

            <LoginForm />

            <div className="mt-4 text-center text-xs text-gray-500 pb-4">
              <p>© 2025 Arabian Gold & Diamonds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

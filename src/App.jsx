import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { lazy } from "react";
import AppProviders from "./utils/AppProviders";
import { Loader } from "./utils/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = lazy(() => import("./pages/Login"));
const MainLayout = lazy(() => import("./Layouts/MainLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const User = lazy(() => import("./pages/User"));
const Kyc = lazy(() => import("./pages/Kyc"));
const Schemes = lazy(() => import("./pages/Schemes"));
const Payments = lazy(() => import("./pages/Payments"));
const Reports = lazy(() => import("./pages/Reports"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProviders>
           <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            theme="light"
          />
          <Suspense
            fallback={
              <div className="text-center w-full h-screen bg-Bgprimary flex items-center justify-center ">
               <Loader/>
              </div>
            }
          >
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Dashboard Routes */}

            <Route path="dashboard" element={<MainLayout />}>
              <Route index element={<Dashboard />} />

              <Route path="users" element={<User />} />

              <Route path="kyc" element={<Kyc />} />

              <Route path="schemes" element={<Schemes />} />

              <Route path="payments" element={<Payments />} />

              <Route path="reports" element={<Reports />} />

              <Route path="notifications" element={<Notifications />} />

              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
          </Suspense>
        </AppProviders>
      </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserSettings from "./components/UserSettings";
import Login from "./components/Login";
import Register from "./components/Register";
import { AppProvider } from "./context/AppProvider";
import { ErrorProvider, useError } from "./context/ErrorContext"; // Import ErrorProvider
import { setupAxiosInterceptor } from "./axiosInterceptor"; // Import the setup function
import BookingPage from "./pages/BookingPage";
import Navbar from "./components/Navbar";
import MyAccountPage from "./pages/MyAccountPage";
import ErrorPage from "./pages/ErrorPage";

import "bootstrap/dist/css/bootstrap.min.css";
// App.js
import { useNavigate } from "react-router-dom";

const AxiosInterceptorSetup = () => {
  const navigate = useNavigate();
  const { triggerError } = useError();

  React.useEffect(() => {
    setupAxiosInterceptor((errorStatus) => triggerError(errorStatus, navigate));
  }, [triggerError, navigate]);

  return null; // This component does not render anything
};

const App = () => {
  return (
    <AppProvider>
      <ErrorProvider>
        <BrowserRouter>
          <AxiosInterceptorSetup />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/myaccount" element={<MyAccountPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorProvider>
    </AppProvider>
  );
};

export default App;

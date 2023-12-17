import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./components/Home";
import UserSettings from "./components/UserSettings";
import { AppProvider } from "./context/AppProvider";
import { ErrorProvider, useError } from "./context/ErrorContext";
import { setupAxiosInterceptor } from "./axiosInterceptor";
import BookingPage from "./pages/BookingPage";
import Navbar from "./components/Navbar";
import MyAccountPage from "./pages/MyAccountPage";
import ErrorPage from "./pages/ErrorPage";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from './components/ProtectedRoute';
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
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          }/>
          <Route path="/myaccount" element={
            <ProtectedRoute>
              <MyAccountPage />
            </ProtectedRoute>
          }/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
      </ErrorProvider>
    </AppProvider>
  );
};

export default App;
import "./App.css";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import UserSettings from "./components/UserSettings"
import { AppProvider } from './context/AppProvider';
import BookingPage from './pages/BookingPage';
import Navbar from './components/Navbar';
import MyAccountPage from './pages/MyAccountPage';
import ErrorPage from './pages/ErrorPage'
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
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
    </AppProvider>
  );
}

export default App;
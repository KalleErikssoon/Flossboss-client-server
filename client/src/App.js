import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import UserSettings from "./components/UserSettings"
import Login from "./components/Login";
import Register from "./components/Register";
import { AppProvider } from './context/AppProvider';
import BookingPage from './pages/BookingPage';
import Navbar from './components/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/booking' element={<BookingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<UserSettings />}/>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

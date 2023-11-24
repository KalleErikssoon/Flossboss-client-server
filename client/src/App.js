import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { AppProvider } from './context/AppProvider';
import BookingPage from './pages/BookingPage';
import Navbar from './components/Navbar';


function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/booking' element={<BookingPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

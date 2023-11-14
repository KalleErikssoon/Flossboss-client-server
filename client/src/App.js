import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register'
import { AppProvider } from './context/AppProvider';



function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
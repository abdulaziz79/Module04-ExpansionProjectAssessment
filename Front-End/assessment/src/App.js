import logo from './logo.svg';
import Dashboard from './Dashboard/Dashboard';
import OneProduct from './OneProduct/OneProduct';
import Login from './Login/Login';
import Register from './Register/Register';
import Products from './products/Products';
import './App.css';
import {BrowserRouter, Router, Route, Routes}  from "react-router-dom"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/oneproduct' element={<OneProduct />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

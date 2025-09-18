import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Register from './Pages/auth/Register'
import Login from './Pages/auth/Login'
import Home from './Pages/auth/Home'
import Navbar from './Pages/Navbar'
import MacProducts from './Pages/MacProducts'

function AppContent() {
  const location = useLocation();
  const showNavbarRoutes = ['/home', '/products', '/cart','/mac']; // Pages where navbar should appear
  
  return (
    <div>
      {showNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/mac' element={<MacProducts/>}/>
        {/* Add your other routes here like Products, Cart etc. */}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
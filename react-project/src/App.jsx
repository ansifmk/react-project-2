import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import ProductDetails from "./Components/Productdetails";
import Profile from "./Pages/Profile";
import ChangePassword from "./Pages/ChangePassword";
import Payment from "./Pages/Payment";
import OrderSuccess from "./Pages/OrderSuccess"; // New page
import MyOrders from "./Pages/MyOrders";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./Context/Authcontext";

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

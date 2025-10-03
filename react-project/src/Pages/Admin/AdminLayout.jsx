import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Admin/AdminNav";
import AdminDashboard from "../Admin/AdminDashboard";
import AdminUsers from "../Admin/AdminUser";
import OrderManagement from "../Admin/OrderManagement";
import ProductsManagement from "../Admin/ProductManagement";

const AdminLayout = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - fixed */}
      <div className="fixed top-0 left-0 h-screen z-50">
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 bg-gray-50 overflow-y-auto transition-all duration-300 ${
          expanded ? "ml-56" : "ml-16"
        }`}
      >
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/products" element={<ProductsManagement />} />
          <Route path="/orders" element={<OrderManagement />} /> {/* Add this route */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
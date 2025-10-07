import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./AdminNav";
import AdminDashboard from "../AdminDashboard";
import AdminUsers from "./AdminUser";
import OrderManagement from "./OrderManagement";
import ProductsManagement from "./ProductManagement";

const AdminLayout = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 h-screen z-50">
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
      </div>
      <div
        className={`flex-1 bg-gray-50 overflow-y-auto transition-all duration-300 ${
          expanded ? "ml-56" : "ml-16"
        }`}
      >
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/products" element={<ProductsManagement />} />
          <Route path="/orders" element={<OrderManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;

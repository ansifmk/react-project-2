import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
      <h1 className="text-3xl font-bold text-green-600">🎉 Order Placed Successfully!</h1>
      <p className="text-gray-700 text-lg">Thank you for your purchase. Your order is on the way.</p>
      <button
        onClick={() => navigate("/products")}
        className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-800 transition"
      >
        Continue Shopping
      </button>
      <button
        onClick={() => navigate("/my-orders")}
        className="bg-gray-800 text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-700 transition"
      >
        View My Orders
      </button>
    </div>
  );
};

export default OrderSuccess;

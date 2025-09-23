import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import axios from "axios";

const MyOrders = () => {
  const { user, setUser } = useContext(AuthContext);
  const [updating, setUpdating] = useState({});

  if (!user || !user.orders || user.orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
        <p className="text-gray-600 text-lg">You have no orders yet.</p>
        <a
          href="/products"
          className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-800 transition"
        >
          Shop Now
        </a>
      </div>
    );
  }

  const cancelOrder = async (orderId) => {
    setUpdating((prev) => ({ ...prev, [orderId]: true }));

    try {
      const order = user.orders.find((o) => o.id === orderId);
      if (!order || order.status === "cancelled") return;

      // 1️⃣ Increase stock for each product
      for (const item of order.items) {
        const productRes = await axios.get(`http://localhost:3001/products/${item.id}`);
        const product = productRes.data;
        const updatedCount = product.count + item.quantity;

        await axios.patch(`http://localhost:3001/products/${item.id}`, { count: updatedCount });
      }

      // 2️⃣ Update order status to "cancelled"
      const updatedOrders = user.orders.map((o) =>
        o.id === orderId ? { ...o, status: "cancelled" } : o
      );

      const updatedUser = { ...user, orders: updatedOrders };
      await axios.patch(`http://localhost:3001/users/${user.id}`, { orders: updatedOrders });

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel order. Please try again.");
    } finally {
      setUpdating((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {user.orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Order ID: {order.id}</h2>
              <span className="text-gray-500 text-sm">
                {new Date(order.created_at).toLocaleString()}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t pt-4 mt-2">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">₹{order.total.toLocaleString()}</span>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              Status:{" "}
              <span
                className={
                  order.status === "pending"
                    ? "text-yellow-600"
                    : order.status === "cancelled"
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {order.status}
              </span>
            </p>

            {/* Cancel button for pending orders */}
            {order.status === "pending" && (
              <button
                onClick={() => cancelOrder(order.id)}
                disabled={updating[order.id]}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                {updating[order.id] ? "Cancelling..." : "Cancel Order"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;

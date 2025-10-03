import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/Authcontext";
import axios from "axios";
import {
  FaBox,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
} from "react-icons/fa";

const MyOrders = () => {
  const { user, setUser } = useContext(AuthContext);
  const [updating, setUpdating] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch updated user data from DB
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user?.id) return;
        const res = await axios.get(`http://localhost:3001/users/${user.id}`);
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user?.id, setUser]);

  // ❌ Cancel order
  const cancelOrder = async (orderId) => {
    setUpdating((prev) => ({ ...prev, [orderId]: true }));

    try {
      const order = user.orders.find((o) => o.id === orderId);
      if (!order || order.status !== "pending") return;

      // restore product stock
      for (const item of order.items) {
        const productRes = await axios.get(
          `http://localhost:3001/products/${item.id}`
        );
        const product = productRes.data;
        const updatedCount = product.count + item.quantity;

        await axios.patch(`http://localhost:3001/products/${item.id}`, {
          count: updatedCount,
        });
      }

      // update order status in user
      const updatedOrders = user.orders.map((o) =>
        o.id === orderId ? { ...o, status: "cancelled" } : o
      );

      const updatedUser = { ...user, orders: updatedOrders };
      await axios.patch(`http://localhost:3001/users/${user.id}`, {
        orders: updatedOrders,
      });

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel order. Please try again.");
    } finally {
      setUpdating((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  // 🟢 Status helpers
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "shipped":
        return "bg-blue-200 text-blue-800";
      case "completed":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="inline-block mr-1" />;
      case "shipped":
        return <FaTruck className="inline-block mr-1" />;
      case "completed":
        return <FaCheckCircle className="inline-block mr-1" />;
      case "cancelled":
        return <FaTimesCircle className="inline-block mr-1" />;
      default:
        return <FaBox className="inline-block mr-1" />;
    }
  };

  if (loading) return <p className="text-center py-10">Loading orders...</p>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {user?.orders && user.orders.length > 0 ? (
        user.orders.map((order) => (
          <div
            key={order.id}
            className="border p-6 rounded-lg shadow-md mb-6 bg-white"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order #{order.id}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                {order.status}
              </span>
            </div>

            <ul className="space-y-3 mb-4">
              {order.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center text-sm"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center">
              <span className="font-semibold">
                Total: ₹
                {order.items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                )}
              </span>
              {order.status === "pending" && (
                <button
                  onClick={() => cancelOrder(order.id)}
                  disabled={updating[order.id]}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                >
                  {updating[order.id] ? "Cancelling..." : "Cancel Order"}
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">You have no orders yet.</p>
      )}
    </div>
  );
};

export default MyOrders;

import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user, setUser } = useContext(AuthContext);
  const [updating, setUpdating] = useState({});
  const [limitReached, setLimitReached] = useState({}); // To show message when max quantity reached
  const navigate = useNavigate();

  if (!user || !user.cart || user.cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
        <button
          onClick={() => navigate("/products")}
          className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-800 transition"
        >
          Back to Products
        </button>
        <p className="text-gray-600 text-lg">Your cart is empty 🛒</p>
      </div>
    );
  }

  const updateCartItem = async (productId, delta) => {
    setUpdating((prev) => ({ ...prev, [productId]: true }));
    setLimitReached((prev) => ({ ...prev, [productId]: false }));

    try {
      const cartItem = user.cart.find((item) => item.id === productId);
      if (!cartItem) return;

      let updatedQuantity = cartItem.quantity + delta;

      // Max quantity limit = 10
      if (updatedQuantity > 10) {
        updatedQuantity = 10;
        setLimitReached((prev) => ({ ...prev, [productId]: true }));
      }

      let updatedCart;
      if (updatedQuantity <= 0) {
        updatedCart = user.cart.filter((item) => item.id !== productId);
      } else {
        updatedCart = user.cart.map((item) =>
          item.id === productId ? { ...item, quantity: updatedQuantity } : item
        );
      }

      const productRes = await axios.get(`http://localhost:3001/products/${productId}`);
      const product = productRes.data;

      // Only reduce stock by actual applied delta
      const appliedDelta = updatedQuantity - cartItem.quantity;
      const updatedCount = product.count - appliedDelta;

      await Promise.all([
        axios.put(`http://localhost:3001/users/${user.id}`, {
          ...user,
          cart: updatedCart,
        }),
        axios.put(`http://localhost:3001/products/${productId}`, {
          ...product,
          count: updatedCount,
        }),
      ]);

      const updatedUser = { ...user, cart: updatedCart };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error updating cart:", err);
      alert("Failed to update cart. Please try again.");
    } finally {
      setUpdating((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const removeFromCart = async (productId) => {
    setUpdating((prev) => ({ ...prev, [productId]: true }));

    try {
      const updatedCart = user.cart.filter((item) => item.id !== productId);
      const cartItem = user.cart.find((item) => item.id === productId);
      const productRes = await axios.get(`http://localhost:3001/products/${productId}`);
      const product = productRes.data;
      const updatedCount = product.count + cartItem.quantity;

      await Promise.all([
        axios.put(`http://localhost:3001/users/${user.id}`, {
          ...user,
          cart: updatedCart,
        }),
        axios.put(`http://localhost:3001/products/${productId}`, {
          ...product,
          count: updatedCount,
        }),
      ]);

      const updatedUser = { ...user, cart: updatedCart };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error removing from cart:", err);
      alert("Failed to remove from cart. Please try again.");
    } finally {
      setUpdating((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const totalPrice = user.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Back to Products Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/products")}
          className="inline-block bg-black text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-800 transition"
        >
          Back to Products
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Left: Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">PRODUCT</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {user.cart.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.images?.[0] || "/placeholder-image.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.description || "No description available"}</p>

                          {item.color && <span className="text-sm text-gray-600 mr-3">Color: {item.color}</span>}
                          {item.size && <span className="text-sm text-gray-600">Size: {item.size}</span>}

                          {item.count !== undefined && (
                            <p className="text-xs text-red-600 font-medium mt-1">
                              {item.count} LEFT IN STOCK
                            </p>
                          )}
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Controls and Remove */}
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2 relative">
                          <button
                            onClick={() => updateCartItem(item.id, -1)}
                            disabled={updating[item.id]}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition text-gray-600"
                          >
                            -
                          </button>
                          <span className="px-3 text-gray-700 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.id, 1)}
                            disabled={
                              updating[item.id] ||
                              (item.count !== undefined && item.quantity >= item.count) ||
                              item.quantity >= 10
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition text-gray-600"
                          >
                            +
                          </button>
                          {limitReached[item.id] && (
                            <span className="absolute top-10 left-0 text-xs text-red-600 font-medium">
                              Maximum quantity reached
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          disabled={updating[item.id]}
                          className="text-red-600 hover:text-red-700 font-medium text-sm transition"
                        >
                          Remove item
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">ORDER SUMMARY</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">TOTAL</span>
                <span className="text-lg font-bold text-gray-900">₹{totalPrice.toLocaleString()}</span>
              </div>

              <button
                onClick={() => alert("Proceed to checkout")}
                className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold shadow-sm hover:bg-gray-800 transition mt-6"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1); // -1 means new address

  if (!user || !user.cart || user.cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
        <p className="text-gray-600 text-lg">Your cart is empty 🛒</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const totalPrice = user.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "zipCode" && !/^\d*$/.test(value)) return; // numbers only
    setForm({ ...form, [name]: value });
  };

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
    if (index === -1) {
      // New address
      setForm({ ...form, address: "", city: "", state: "", zipCode: "" });
    } else {
      const addr = user.addresses[index]; // object
      setForm({
        ...form,
        address: addr.address,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipCode,
      });
    }
  };

  const handlePayment = async () => {
    if (form.email && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email)) {
      alert("Please enter a valid Gmail address (must end with @gmail.com)");
      return;
    }

    if (!/^\d+$/.test(form.zipCode)) {
      alert("ZIP code must contain only numbers");
      return;
    }

    if (paymentMethod === "card") {
      if (!form.cardName || !form.cardNumber || !form.expiry || !form.cvv) {
        alert("Please fill all payment details");
        return;
      }
    }

    if (!form.fullName || !form.address || !form.city || !form.state || !form.zipCode) {
      alert("Please fill all shipping information");
      return;
    }

    setLoading(true);

    try {
      // Reduce stock for each product
      for (const item of user.cart) {
        const productRes = await axios.get(`http://localhost:3001/products/${item.id}`);
        const product = productRes.data;
        const updatedCount = product.count - item.quantity;
        await axios.put(`http://localhost:3001/products/${item.id}`, { ...product, count: updatedCount });
      }

      // Save order
      const newOrder = {
        id: "order_" + new Date().getTime(),
        items: user.cart,
        total: totalPrice,
        shippingInfo: {
          fullName: form.fullName,
          address: form.address,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
        },
        paymentMethod,
        created_at: new Date().toISOString(),
        status: "pending",
      };

      const updatedUser = {
        ...user,
        orders: [...(user.orders || []), newOrder],
        cart: [],
      };

      await axios.put(`http://localhost:3001/users/${user.id}`, updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/order-success");
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Shipping and Payment Information */}
          <div className="flex-1 space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter email (must end with @gmail.com)"
                  />
                </div>

                {/* Address Selection */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Address*
                  </label>
                  <select
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    value={selectedAddressIndex}
                    onChange={(e) => handleAddressSelect(Number(e.target.value))}
                  >
                    <option value={-1}>Use new address</option>
                    {user.addresses?.map((addr, index) => (
                      <option key={index} value={index}>
                        {`${addr.address}, ${addr.city}, ${addr.state}, ${addr.zipCode}`}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedAddressIndex === -1 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address*
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City*
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State*
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code*
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={form.zipCode}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter ZIP code (numbers only)"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-300" />

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-4">Payment Method</h2>

              {/* Cash on Delivery */}
              <div className="flex items-center space-x-3 p-4 border rounded-lg mb-3 hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="h-5 w-5 text-black focus:ring-black"
                />
                <div className="flex-1">
                  <span className="font-semibold">Cash on Delivery</span>
                  <p className="text-sm text-gray-600">
                    Pay when you receive your order
                  </p>
                </div>
              </div>

              {/* Credit/Debit Card */}
              <div className="flex items-center space-x-3 p-4 border rounded-lg mb-3 hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="h-5 w-5 text-black focus:ring-black"
                />
                <div className="flex-1">
                  <span className="font-semibold">Credit/Debit Card</span>
                  <p className="text-sm text-gray-600">
                    Pay securely with your card
                  </p>
                </div>
              </div>

              {/* Uff Payment */}
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "uff"}
                  onChange={() => setPaymentMethod("uff")}
                  className="h-5 w-5 text-black focus:ring-black"
                />
                <div className="flex-1">
                  <span className="font-semibold">Uff Payment</span>
                  <p className="text-sm text-gray-600">
                    Pay instantly via Uff apps
                  </p>
                </div>
              </div>

              {/* Card Details (only when card selected) */}
              {paymentMethod === "card" && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-4">Card Details</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={form.cardName}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={form.cardNumber}
                      onChange={handleChange}
                      maxLength={16}
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={form.expiry}
                        onChange={handleChange}
                        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={form.cvv}
                        onChange={handleChange}
                        maxLength={3}
                        className="w-32 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Product List */}
              <div className="space-y-4 mb-6">
                {user.cart.map((item) => (
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

              {/* Price Breakdown */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {paymentMethod === "cash" && (
                <p className="text-gray-600 text-sm mt-4 text-center">
                  You will pay when you receive your order
                </p>
              )}

              {/* Place Order Button */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold shadow-sm hover:bg-gray-800 transition mt-6"
              >
                {loading ? "Processing..." : `Place Order - ₹${totalPrice.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

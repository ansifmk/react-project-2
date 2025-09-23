import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const updatedUser = { ...user, ...formData };
      
      await axios.put(`http://localhost:3001/users/${user.id}`, updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || ""
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your profile</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Profile Information</h1>
          <p className="text-gray-600 text-lg">Manage your personal information and security settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">Personal Information</h2>
                
                {/* Full Name Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide">Full Name</label>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900 font-medium text-lg">{user.name || "Not provided"}</span>
                    </div>
                  )}
                </div>

                {/* Phone Section */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-3">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900 font-medium text-lg">{user.phone || "Not provided"}</span>
                    </div>
                  )}
                </div>

                {/* Email Section */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-3">Email</label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-gray-900 font-medium text-lg block">{user.email}</span>
                      <span className="text-xs text-gray-500 mt-1">Email cannot be changed</span>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-3">Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Enter your complete address"
                    />
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900 font-medium text-lg">{user.address || "Not provided"}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">Security</h2>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide mb-1">Password</label>
                    <p className="text-gray-600 text-lg">••••••••</p>
                  </div>
                  <button
                    onClick={() => navigate("/change-password")}
                    className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Profile Actions</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm mb-3"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium shadow-sm disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Account Overview Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Account Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Orders</span>
                  <span className="font-semibold text-gray-900 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {user.orders?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Wishlist Items</span>
                  <span className="font-semibold text-gray-900 bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                    {user.wishlist?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Cart Items</span>
                  <span className="font-semibold text-gray-900 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {user.cart?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold text-gray-900">
                    {user.created_at ? new Date(user.created_at).getFullYear() : "2024"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Quick Links</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => navigate("/my-orders")}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  My Orders
                </button>
                <button 
                  onClick={() => navigate("/wishlist")}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Wishlist
                </button>
                <button 
                  onClick={() => navigate("/cart")}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Shopping Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
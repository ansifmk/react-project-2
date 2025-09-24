import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Authcontext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const getInitial = () => (user?.name ? user.name.charAt(0).toUpperCase() : "U");

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className="text-2xl font-bold text-black tracking-wide cursor-pointer"
              onClick={() => navigate("/")}
            >
              Apple
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate("/")}
              className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
            >
              Store
            </button>
            <button
              onClick={() => navigate("/products")}
              className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
            >
              Products
            </button>
            <button
              onClick={() => navigate("/about")}
              className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <div className="relative">
              <button
                onClick={() => navigate("/wishlist")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              {user?.wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {user.wishlist.length}
                </span>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <button
                onClick={() => navigate("/cart")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6"
                  />
                </svg>
              </button>
              {user?.cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {user.cart.length}
                </span>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-2 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitial()}
                  </div>
                  <span className="text-gray-700 font-medium hidden sm:block">
                    Hi, {user.name?.split(" ")[0] || "User"}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button
                      onClick={() => {
                        navigate("/my-orders");
                        setUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Profile
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
          <button
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
          >
            Store
          </button>
          <button
            onClick={() => {
              navigate("/products");
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
          >
            Products
          </button>
          <button
            onClick={() => {
              navigate("/about");
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
          >
            About
          </button>

          {user && (
            <>
              <button
                onClick={() => {
                  navigate("/my-orders");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  navigate("/profile");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
              >
                Profile
              </button>
            </>
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-blue-600 hover:bg-gray-100"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

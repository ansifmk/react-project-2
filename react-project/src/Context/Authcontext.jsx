import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 🔐 Login function
  const login = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const cleanEmail = email.trim().toLowerCase();

      // Fetch from JSON Server
      const res = await axios.get(
        `http://localhost:3001/users?email=${cleanEmail}`
      );

      if (res.data.length === 0) {
        throw new Error("User not found");
      }

      const foundUser = res.data[0];

      // Email check (case-insensitive)
      if (foundUser.email.toLowerCase() !== cleanEmail) {
        throw new Error("Invalid email");
      }

      // Password check
      if (foundUser.password !== password) {
        throw new Error("Invalid password");
      }

      // Block check
      if (foundUser.isBlock) {
        throw new Error("Your account has been blocked. Contact admin.");
      }

      // ✅ Save user
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));

      return { success: true, user: foundUser };
    } catch (err) {
      return { success: false, message: err.message || "Login failed" };
    }
  };

  // 🚪 Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

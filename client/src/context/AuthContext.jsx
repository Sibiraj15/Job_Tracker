import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      setUser({ token });
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }

    setLoading(false);
  }, []);

  const loginUser = (token, userData = {}) => {
    localStorage.setItem("token", token);
    setUser({ token, ...userData });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
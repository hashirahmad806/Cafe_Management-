import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('cafeAdmin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setAdmin(data);
        localStorage.setItem('cafeAdmin', JSON.stringify(data));
        return true;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('cafeAdmin');
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

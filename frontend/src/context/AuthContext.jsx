
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // For demo purposes, this would be replaced with actual authentication logic
  useEffect(() => {
    // Mock user authentication
    const mockUser = {
      id: 'user123',
      name: 'John Doe',
      role: 'bloodbank', // Try: 'patient', 'donor', or 'bloodbank'
      email: 'john@example.com',
    };
    
    // setUserRole(mockUser.role);
    // setIsAuthenticated(true);
  }, []);
  
  const value = {
    userRole,
    isAuthenticated,
    // Add authentication methods here in a real app
    login: (role) => {
      setIsAuthenticated(true);
      setUserRole(role); // For demo
    },
    logout: () => {
      setIsAuthenticated(false);
      localStorage.clear();
      localStorage.removeItem('userIdx');

      setUserRole(null);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

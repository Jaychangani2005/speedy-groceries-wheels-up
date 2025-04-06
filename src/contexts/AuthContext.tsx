
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (mobile: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);
    
    // Load user data from localStorage if logged in
    if (loggedIn) {
      const savedUser = localStorage.getItem('userData');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Fallback mock user
        const defaultUser = {
          id: '1',
          name: 'Rahul Kumar',
          mobile: '9876543210',
          email: 'rahul.k@example.com',
          avatar: '/img/avatar-1.png'
        };
        setUser(defaultUser);
        localStorage.setItem('userData', JSON.stringify(defaultUser));
      }
    }
  }, []);

  const login = async (mobile: string, password: string) => {
    // Mock login API call
    // In a real app, this would be an API call to your backend
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, any credentials will work
    const userData = {
      id: '1',
      name: 'Rahul Kumar',
      mobile,
      email: 'rahul.k@example.com',
      avatar: '/img/avatar-1.png'
    };
    
    setIsAuthenticated(true);
    setUser(userData);
    
    // Store authentication state and user data in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const register = async (userData: any) => {
    // Mock registration API call
    // In a real app, this would be an API call to your backend
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, registration always succeeds
    console.log('User registered:', userData);
    
    // We're removing the automatic redirect to login since we'll handle that in the Register component
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


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
    
    // Mock user data if logged in
    if (loggedIn) {
      setUser({
        id: '1',
        name: 'Rahul Kumar',
        mobile: '9876543210',
        email: 'rahul.k@example.com',
        avatar: '/img/avatar-1.png'
      });
    }
  }, []);

  const login = async (mobile: string, password: string) => {
    // Mock login API call
    // In a real app, this would be an API call to your backend
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, any credentials will work
    setIsAuthenticated(true);
    setUser({
      id: '1',
      name: 'Rahul Kumar',
      mobile,
      email: 'rahul.k@example.com',
      avatar: '/img/avatar-1.png'
    });
    
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const register = async (userData: any) => {
    // Mock registration API call
    // In a real app, this would be an API call to your backend
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, registration always succeeds
    console.log('User registered:', userData);
    
    // In a real app, you might want to log the user in immediately or redirect to login
    navigate('/login');
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


import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
  id: string;
  name: string;
  mobile: string;
  email: string;
  avatar: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  vehicleType?: string;
  vehicleRegistrationNumber?: string;
  drivingLicenseNumber?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (mobile: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
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
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if any registered user exists with this mobile number
      const usersData = localStorage.getItem('registeredUsers');
      let users = [];
      
      if (usersData) {
        users = JSON.parse(usersData);
        const user = users.find((u: any) => u.mobile === mobile);
        
        if (user) {
          // For demo purposes, we're not checking password
          setIsAuthenticated(true);
          setUser(user);
          
          // Store authentication state and user data in localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userData', JSON.stringify(user));
          return;
        }
      }
      
      // If no registered user found, use default user (for demo)
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
      
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const register = async (userData: any) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get existing users or create empty array
      const existingUsersData = localStorage.getItem('registeredUsers');
      let users = existingUsersData ? JSON.parse(existingUsersData) : [];
      
      // Check if mobile already exists
      if (users.some((user: any) => user.mobile === userData.mobile)) {
        throw new Error("This mobile number is already registered");
      }
      
      // Create a new user object with the registered data
      const newUser = {
        id: Date.now().toString(), // Generate unique ID
        name: userData.fullName,
        mobile: userData.mobile,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        pincode: userData.pincode,
        vehicleType: userData.vehicleType,
        vehicleRegistrationNumber: userData.vehicleRegistrationNumber,
        drivingLicenseNumber: userData.drivingLicenseNumber,
        avatar: '/img/avatar-1.png' // Default avatar
      };
      
      // Add to users array
      users.push(newUser);
      
      // Save back to localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      // Auto-login after registration
      setIsAuthenticated(true);
      setUser(newUser);
      
      // Store authentication state and user data in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      // Navigate to dashboard
      navigate('/delivery');
      
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
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

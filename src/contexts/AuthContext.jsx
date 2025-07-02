import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication - in real app, this would connect to Firebase
  const login = async (email, password, userType) => {
    // Simulate API call
    const mockUser = {
      id: Date.now().toString(),
      email,
      userType,
      name: userType === 'farmer' ? 'John Farmer' : 'Dr. Smith',
      address: 'Kathmandu, Nepal',
      phone: '+977-1234567890'
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    return mockUser;
  };

  const register = async (userData) => {
    // Simulate API call
    const mockUser = {
      id: Date.now().toString(),
      ...userData
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would be authenticated against a backend
const MOCK_USERS = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    password: "password123"
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("nutrimind-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching email and password
    const matchedUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (!matchedUser) {
      setLoading(false);
      throw new Error("Invalid email or password");
    }
    
    // Remove password from user object
    const { password: _, ...userWithoutPassword } = matchedUser;
    setUser(userWithoutPassword);
    localStorage.setItem("nutrimind-user", JSON.stringify(userWithoutPassword));
    setLoading(false);
  };

  const signup = async (email: string, name: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      setLoading(false);
      throw new Error("User with this email already exists");
    }
    
    // Create new user
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      email,
      name,
      password
    };
    
    // In a real app, this would be an API call to create a user
    MOCK_USERS.push(newUser);
    
    // Remove password from user object
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("nutrimind-user", JSON.stringify(userWithoutPassword));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nutrimind-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

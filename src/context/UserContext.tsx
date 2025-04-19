
import React, { createContext, useContext, useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  balance: number;
  rewards: number;
  language: string;
}

interface UserContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = (userData: UserProfile) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      updateProfile,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

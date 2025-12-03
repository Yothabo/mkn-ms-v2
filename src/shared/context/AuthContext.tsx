import React, { createContext, useContext, ReactNode } from 'react';

// Import split components
import { AuthContextType } from './AuthContext.types';
import { useAuthState } from './AuthContext.hooks';
import { useAuthActions } from './AuthContext.actions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, setUser, isLoading, setIsLoading } = useAuthState();
  const { login, register, logout } = useAuthActions(setUser, setIsLoading);

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
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

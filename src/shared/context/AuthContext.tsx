import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Member, Position } from '../../../config/members';

interface AuthUser extends Member {
  isAdmin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const mockUsers: AuthUser[] = [
  {
    id: '1',
    name: 'Admin',
    surname: 'User',
    cardNumber: 1001,
    gender: 'male',
    dateOfBirth: '1980-01-01',
    phone: '+1234567890',
    email: 'admin@mkn.org',
    dateOfEntry: '2020-01-01',
    reasonOfEntry: 'Founder',
    nextOfKin: {
      name: 'Next',
      surname: 'Kin',
      phone: '+1234567891'
    },
    address: '123 Main St',
    raCount: 0,
    raLock: false,
    status: 'active',
    position: 'evangelist',
    purity: 'inapplicable',
    mainBranch: 'bulawayo-hq',
    lastAttendance: new Date().toISOString().split('T')[0],
    isAdmin: true
  },
  {
    id: '2',
    name: 'Regular',
    surname: 'Member',
    cardNumber: 1002,
    gender: 'female',
    dateOfBirth: '1990-01-01',
    phone: '+1234567892',
    email: 'member@mkn.org',
    dateOfEntry: '2021-01-01',
    reasonOfEntry: 'Member',
    nextOfKin: {
      name: 'Next',
      surname: 'Kin',
      phone: '+1234567893'
    },
    address: '456 Oak St',
    raCount: 0,
    raLock: false,
    status: 'active',
    position: 'member',
    purity: 'virgin',
    mainBranch: 'bulawayo-hq',
    lastAttendance: new Date().toISOString().split('T')[0],
    isAdmin: false
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('mkn-auth-user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('mkn-auth-user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const foundUser = mockUsers.find(u => u.email === email);

      if (foundUser) {
        const isAdmin = foundUser.position === 'evangelist' || foundUser.position === 'clerk';
        const userWithAdmin = { ...foundUser, isAdmin };

        setUser(userWithAdmin);
        localStorage.setItem('mkn-auth-user', JSON.stringify(userWithAdmin));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      // Simulate API call to invalidate session
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUser(null);
      localStorage.removeItem('mkn-auth-user');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    login,
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

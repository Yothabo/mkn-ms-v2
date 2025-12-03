import { useState, useEffect } from 'react';
import { AuthUser } from './AuthContext.types';

export const useAuthState = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('AuthProvider - Checking authentication...');
        
        // Check localStorage first (remember me users)
        let savedUser = localStorage.getItem('mkn-auth-user');
        console.log('AuthProvider - Saved user from localStorage:', savedUser);

        // If no localStorage user, check sessionStorage
        if (!savedUser) {
          savedUser = sessionStorage.getItem('mkn-auth-user');
          console.log('AuthProvider - Saved user from sessionStorage:', savedUser);
        }

        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          console.log('AuthProvider - Setting user:', parsedUser);
          setUser(parsedUser);
        } else {
          console.log('AuthProvider - No saved user found');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('mkn-auth-user');
        sessionStorage.removeItem('mkn-auth-user');
      } finally {
        console.log('AuthProvider - Setting isLoading to false');
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    user,
    setUser,
    isLoading,
    setIsLoading
  };
};

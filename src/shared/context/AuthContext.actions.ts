import { AuthUser } from './AuthContext.types';
import { AuthService } from './AuthService';

export const useAuthActions = (
  setUser: (user: AuthUser | null) => void,
  setIsLoading: (loading: boolean) => void
) => {
  const authService = new AuthService();

  const login = async (cardNumber: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
    try {
      console.log('AuthProvider - Starting login...', { cardNumber, rememberMe });
      setIsLoading(true);
      const user = await authService.login(cardNumber, password);
      console.log('AuthProvider - Login result:', user);

      if (user) {
        setUser(user);
        
        if (rememberMe) {
          // Store user data for persistent login
          localStorage.setItem('mkn-auth-user', JSON.stringify(user));
          console.log('AuthProvider - Login successful, user saved to localStorage (remember me)');
        } else {
          // Only store in session for current session
          sessionStorage.setItem('mkn-auth-user', JSON.stringify(user));
          console.log('AuthProvider - Login successful, user saved to sessionStorage');
        }
        
        return true;
      }
      console.log('AuthProvider - Login failed, no user returned');
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      console.log('AuthProvider - Login finished, setting isLoading to false');
      setIsLoading(false);
    }
  };

  const register = async (data: any): Promise<boolean> => {
    try {
      console.log('AuthProvider - Starting registration...', data);
      setIsLoading(true);
      const user = await authService.register(data);
      console.log('AuthProvider - Registration result:', user);

      if (user) {
        setUser(user);
        localStorage.setItem('mkn-auth-user', JSON.stringify(user));
        console.log('AuthProvider - Registration successful, user saved to localStorage');
        if (data.token) {
          localStorage.setItem('mkn-auth-token', data.token);
        }
        return true;
      }
      console.log('AuthProvider - Registration failed, no user returned');
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      localStorage.removeItem('mkn-auth-user');
      localStorage.removeItem('mkn-auth-token');
      sessionStorage.removeItem('mkn-auth-user');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    logout
  };
};

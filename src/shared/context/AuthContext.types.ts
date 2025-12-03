import { Member } from '../../../config/members';

export interface AuthUser extends Member {
  isAdmin: boolean;
  isFounder: boolean;
  isTech: boolean;
  role: 'founder' | 'admin' | 'member' | 'tech';
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  cardReceiptNumber: string;
  password: string;
  confirmPassword: string;
  verifiedUser?: any;
  token?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (cardNumber: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

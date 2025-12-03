import { ExtendedMember } from '../../data/mock/interfaces';
import { MockMemberData } from '../../features/auth/services/verificationServiceData';

const mockMemberData = new MockMemberData();

export interface AuthUser extends ExtendedMember {
  isAdmin: boolean;
  isFounder: boolean;
  isTech: boolean;
  role: 'founder' | 'admin' | 'member' | 'tech';
}

export class AuthService {
  async login(cardNumber: string, password: string): Promise<AuthUser | null> {
    console.log('AuthService - Login attempt:', { cardNumber, password });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find member by card or receipt number
    const member = mockMemberData.getFullMember(cardNumber);

    if (!member) {
      console.log('AuthService - Member not found');
      throw new Error('Invalid card or receipt number');
    }

    // Check member status (skip for founder and tech)
    if (member.cardNumber !== 9999 && member.cardNumber !== 8888) {
      if (member.status === 'deceased') {
        throw new Error('This account is no longer active');
      }

      if (member.status === 'inactive') {
        throw new Error('Your account has been deactivated. Please contact your branch.');
      }
    }

    // For demo, accept any non-empty password
    if (!password || password.length < 1) {
      throw new Error('Please enter your password');
    }

    console.log('AuthService - Login successful for:', member.name, member.surname);

    // Determine user role based on position and card number
    const isFounder = member.cardNumber === 9999; // Founder user
    const isTech = member.cardNumber === 8888; // Tech user
    const isAdmin = isFounder || isTech ||
                   member.position === 'evangelist' ||
                   member.position === 'clerk' ||
                   member.position === 'messenger';

    const role: 'founder' | 'admin' | 'member' | 'tech' = 
      isFounder ? 'founder' : 
      isTech ? 'tech' : 
      isAdmin ? 'admin' : 'member';

    console.log('AuthService - User role:', role, 'Position:', member.position, 'Card:', member.cardNumber);

    // Create auth user
    const authUser: AuthUser = {
      ...member,
      isAdmin,
      isFounder,
      isTech,
      role
    };

    return authUser;
  }

  async register(data: any): Promise<AuthUser | null> {
    console.log('AuthService - Registration attempt:', data);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find member by card or receipt number
    const member = mockMemberData.getFullMember(data.cardReceiptNumber);

    if (!member) {
      throw new Error('Invalid card or receipt number');
    }

    // Verify name matches (skip for founder and tech)
    if (member.cardNumber !== 9999 && member.cardNumber !== 8888) {
      if (member.name.toLowerCase() !== data.firstName.toLowerCase() ||
          member.surname.toLowerCase() !== data.lastName.toLowerCase()) {
        throw new Error('Name does not match our records');
      }
    }

    // Check member status (skip for founder and tech)
    if (member.cardNumber !== 9999 && member.cardNumber !== 8888) {
      if (member.status === 'deceased') {
        throw new Error('This account is no longer active');
      }

      if (member.status === 'inactive') {
        throw new Error('Your account has been deactivated. Please contact your branch.');
      }
    }

    console.log('AuthService - Registration successful for:', member.name, member.surname);

    // Determine user role based on position and card number
    const isFounder = member.cardNumber === 9999; // Founder user
    const isTech = member.cardNumber === 8888; // Tech user
    const isAdmin = isFounder || isTech ||
                   member.position === 'evangelist' ||
                   member.position === 'clerk' ||
                   member.position === 'messenger';

    const role: 'founder' | 'admin' | 'member' | 'tech' = 
      isFounder ? 'founder' : 
      isTech ? 'tech' : 
      isAdmin ? 'admin' : 'member';

    // Create auth user
    const authUser: AuthUser = {
      ...member,
      isAdmin,
      isFounder,
      isTech,
      role
    };

    return authUser;
  }

  async logout(): Promise<void> {
    console.log('AuthService - Logout');
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

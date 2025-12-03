import { ExtendedMember } from '../../../data/mock/interfaces';
import { harareMembers } from '../../../data/mock/members/harareMembers';
import { bulawayoMembers } from '../../../data/mock/members/bulawayoMembers';
import { gaboroneMembers } from '../../../data/mock/members/gaboroneMembers';
import { johannesburgMembers } from '../../../data/mock/members/johannesburgMembers';
import { pretoriaMembers } from '../../../data/mock/members/pretoriaMembers';

// Combine all members from all branches
const allMembers: ExtendedMember[] = [
  ...harareMembers,
  ...bulawayoMembers,
  ...gaboroneMembers,
  ...johannesburgMembers,
  ...pretoriaMembers
];

export class MemberAuthService {
  // Find member by card number or receipt number
  findMemberByIdentifier(cardReceiptNumber: string): ExtendedMember | undefined {
    return allMembers.find(member => 
      member.cardNumber?.toString() === cardReceiptNumber || 
      member.receiptNumber === cardReceiptNumber
    );
  }

  // Find member by name and identifier for verification
  findMemberForVerification(firstName: string, lastName: string, cardReceiptNumber: string): ExtendedMember | undefined {
    return allMembers.find(member => 
      member.name.toLowerCase() === firstName.toLowerCase() &&
      member.surname.toLowerCase() === lastName.toLowerCase() &&
      (member.cardNumber?.toString() === cardReceiptNumber || member.receiptNumber === cardReceiptNumber)
    );
  }

  // Get active members for testing
  getActiveMembersWithCredentials(limit: number = 10): Array<{member: ExtendedMember, credentials: {identifier: string, type: 'card' | 'receipt'}}> {
    const activeMembers = allMembers
      .filter(m => m.status === 'active')
      .slice(0, limit)
      .map(member => ({
        member,
        credentials: {
          identifier: member.cardNumber ? member.cardNumber.toString() : member.receiptNumber || '',
          type: member.cardNumber ? 'card' : 'receipt'
        }
      }))
      .filter(item => item.credentials.identifier); // Only include members with valid identifiers

    return activeMembers;
  }

  // Validate password (in real app, this would check hashed password)
  validatePassword(member: ExtendedMember, password: string): boolean {
    // For demo purposes, accept any non-empty password
    // In real implementation, this would check against stored hash
    return password.length > 0;
  }
}

export const memberAuthService = new MemberAuthService();

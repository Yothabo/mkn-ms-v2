import { VerificationRequest } from '../types/verification';
import { ExtendedMember } from '../../../data/mock/interfaces';

// Import split components
import { embeddedMembers } from './verificationMembers.data';
import { maskContact } from './verificationService.utils';
import { mockMembers, logTestAccounts } from './verificationService.console';

// Log test accounts on import
logTestAccounts();

export class MockMemberData {
  findMember(data: VerificationRequest) {
    const member = mockMembers.find(m =>
      m.firstName.toLowerCase() === data.firstName.toLowerCase() &&
      m.lastName.toLowerCase() === data.lastName.toLowerCase() &&
      m.cardReceiptNumber === data.cardReceiptNumber
    );

    if (member) {
      console.log(`Member found: ${member.firstName} ${member.lastName}`);
      console.log(`Email: ${member.email}, Phone: ${member.phone}`);
    } else {
      console.log(`Member not found: ${data.firstName} ${data.lastName} - ${data.cardReceiptNumber}`);
    }

    return member;
  }

  findMemberByCard(cardReceiptNumber: string) {
    const member = mockMembers.find(m => m.cardReceiptNumber === cardReceiptNumber);

    if (member) {
      console.log(`Member found by card: ${member.firstName} ${member.lastName}`);
    } else {
      console.log(`Member not found by card: ${cardReceiptNumber}`);
    }

    return member;
  }

  findMemberByContact(contact: string, method: string) {
    const member = mockMembers.find(m =>
      method === 'email' ? m.email === contact : m.phone === contact
    );

    if (member) {
      console.log(`Member found by ${method}: ${member.firstName} ${member.lastName}`);
    } else {
      console.log(`Member not found by ${method}: ${contact}`);
    }

    return member;
  }

  maskContact(contact: string, method: string): string {
    return maskContact(contact, method);
  }

  // Get full member data for authentication
  getFullMember(cardReceiptNumber: string): ExtendedMember | undefined {
    const index = mockMembers.findIndex(m => m.cardReceiptNumber === cardReceiptNumber);
    return index >= 0 ? embeddedMembers[index] : undefined;
  }
}

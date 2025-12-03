import { MockMemberData } from './verificationServiceData';

export class ForgotPasswordService {
  private mockMemberData = new MockMemberData();

  // Lookup member by card/receipt number to get their details for verification
  lookupMemberForVerification(cardReceiptNumber: string) {
    console.log('ForgotPasswordService - Looking up member for:', cardReceiptNumber);
    
    const member = this.mockMemberData.findMemberByCard(cardReceiptNumber);
    
    if (!member) {
      console.log('ForgotPasswordService - Member not found');
      throw new Error('We could not find your membership profile. Please confirm your membership at your nearest Muzi Ka Nkulunkulu branch and ensure your details are correctly registered.');
    }

    console.log('ForgotPasswordService - Member found:', member.firstName, member.lastName);
    
    return {
      firstName: member.firstName,
      lastName: member.lastName,
      cardReceiptNumber: member.cardReceiptNumber,
      email: member.email,
      phone: member.phone
    };
  }
}

export const forgotPasswordService = new ForgotPasswordService();

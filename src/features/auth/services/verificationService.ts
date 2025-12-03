import { VerificationRequest, VerificationResponse, VerifyOtpRequest, VerifyOtpResponse } from '../types/verification';
import { MockMemberData } from './verificationServiceData';
import { OtpService } from './OtpService';

export class VerificationService {
  private mockMemberData = new MockMemberData();
  private otpService = new OtpService();

  async requestVerification(data: VerificationRequest): Promise<VerificationResponse> {
    console.log('VerificationService - Verifying member:', data.cardReceiptNumber);

    // Clean up expired OTPs before processing
    this.otpService.cleanupExpiredOtps();

    const member = this.mockMemberData.findMemberByCard(data.cardReceiptNumber);

    if (!member) {
      console.log('VerificationService - Member not found');
      throw new Error('Member not found. Please check your profile number.');
    }

    console.log('VerificationService - Member found:', member.firstName, member.lastName);

    // Check if profile can receive OTP (not locked)
    const canResend = this.canResendOtp(data.cardReceiptNumber);
    if (!canResend.canResend) {
      throw new Error(canResend.message || 'Too many verification attempts. Please try again later.');
    }

    // Generate and send OTP
    return this.otpService.generateAndSendOtp(data, member);
  }

  async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    console.log('VerificationService - Verifying OTP for method:', data.method);

    // Clean up expired OTPs before processing
    this.otpService.cleanupExpiredOtps();

    // Let the OTP service handle all the specific error cases directly
    const result = this.otpService.verifyOtpAndGetUser(data);
    console.log('VerificationService - OTP verification result:', result);
    return result;
  }

  async resendOtp(data: VerificationRequest): Promise<VerificationResponse> {
    console.log('VerificationService - Resending OTP for:', data.cardReceiptNumber);
    return this.requestVerification(data);
  }

  // Public method to check if a profile can receive OTP
  canResendOtp(cardReceiptNumber: string): { canResend: boolean; message?: string } {
    console.log('VerificationService - Checking if profile can resend OTP:', cardReceiptNumber);
    return this.otpService.canResendOtp(cardReceiptNumber);
  }

  // Method to manually reset profile lock for testing
  resetProfileLock(cardReceiptNumber: string) {
    console.log('VerificationService - Manually resetting profile lock for:', cardReceiptNumber);
    this.otpService.resetProfileLock(cardReceiptNumber);
  }
}

export const verificationService = new VerificationService();

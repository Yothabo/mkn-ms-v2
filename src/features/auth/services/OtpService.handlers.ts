import { VerificationRequest, VerificationResponse, VerifyOtpRequest, VerifyOtpResponse } from '../types/verification';
import { MockMemberData } from './verificationServiceData';
import { ProfileLockManager } from './ProfileLockManager';
import { OtpStoreManager } from './OtpStoreManager';

export class OtpServiceHandlers {
  constructor(
    private mockMemberData: MockMemberData,
    private profileLockManager: ProfileLockManager,
    private otpStoreManager: OtpStoreManager
  ) {}

  generateAndSendOtp(data: VerificationRequest, member: any): VerificationResponse {
    console.log('OTP Service - Generating OTP for profile:', data.cardReceiptNumber);

    // Check if profile is locked - if locked, throw error silently (no alert)
    if (this.profileLockManager.isProfileLocked(data.cardReceiptNumber)) {
      const message = this.profileLockManager.getLockMessage(data.cardReceiptNumber);
      console.log('OTP Service - PROFILE IS LOCKED, blocking OTP silently');
      throw new Error(message);
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresIn = 1 * 60 * 1000;
    const expiresAt = Date.now() + expiresIn;

    const contact = data.method === 'email' ? member.email : member.phone;
    const maskedContact = this.mockMemberData.maskContact(contact, data.method);

    // Record this OTP request (this will automatically lock on 3rd request)
    const newRequestCount = this.profileLockManager.recordOtpRequest(data.cardReceiptNumber);

    const key = `${member.cardReceiptNumber}-${data.method}`;
    this.otpStoreManager.storeOtp(key, {
      otp,
      expiresAt,
      contact,
      attempts: 0,
      cardReceiptNumber: data.cardReceiptNumber
    });

    // ALWAYS SHOW OTP ALERT FOR TESTING - even if profile gets locked after this request
    setTimeout(() => {
      alert(`TEST OTP for ${member.firstName} ${member.lastName}: ${otp}\n\nThis would be sent to: ${maskedContact}\n\nCode expires in 1 minute.\n\nOTP Request: ${newRequestCount}/3`);
    }, 500);

    return {
      success: true,
      message: `OTP sent to your ${data.method}`,
      maskedContact,
      expiresIn: expiresIn / 1000
    };
  }

  verifyOtpAndGetUser(data: VerifyOtpRequest): VerifyOtpResponse {
    console.log('OTP Service - Verifying OTP');

    const found = this.otpStoreManager.findOtpByMethod(data.method);

    if (!found) {
      return {
        success: false,
        message: 'Verification failed',
        user: undefined,
        token: undefined
      };
    }

    const { key, otpData } = found;
    const { otp, expiresAt, contact, attempts, cardReceiptNumber } = otpData;

    if (this.otpStoreManager.isExpired(key)) {
      this.otpStoreManager.deleteOtp(key);
      throw new Error('OTP has expired. Please request a new one.');
    }

    if (this.otpStoreManager.hasMaxAttempts(key)) {
      this.otpStoreManager.deleteOtp(key);

      // Lock the profile when "Verification failed. You have used all available attempts"
      console.log('OTP Service - Maximum OTP attempts reached, locking profile:', cardReceiptNumber);
      this.profileLockManager.lockProfile(cardReceiptNumber);

      throw new Error('Verification failed. You have used all available attempts. Please contact support.');
    }

    if (otp === data.otp) {
      const member = this.mockMemberData.findMemberByContact(contact, data.method);
      if (!member) {
        throw new Error('Member verification failed. Please try again.');
      }

      // Reset profile lock on successful verification
      this.profileLockManager.resetProfile(member.cardReceiptNumber);
      console.log('OTP Service - Profile lock reset on successful verification');

      return {
        success: true,
        message: 'Verification successful',
        user: {
          id: member.cardReceiptNumber,
          email: member.email,
          fullName: `${member.firstName} ${member.lastName}`,
          branch: member.branch,
          role: 'member'
        },
        token: `mock-jwt-token-${member.cardReceiptNumber}`
      };
    } else {
      this.otpStoreManager.incrementAttempts(key);
      const remainingAttempts = this.otpStoreManager.getRemainingAttempts(key);

      if (remainingAttempts > 0) {
        throw new Error(`Invalid OTP code. ${remainingAttempts} attempt${remainingAttempts > 1 ? 's' : ''} remaining.`);
      } else {
        // This will trigger the lock in the condition above
        throw new Error('Too many incorrect attempts. Please request a new code.');
      }
    }
  }
}

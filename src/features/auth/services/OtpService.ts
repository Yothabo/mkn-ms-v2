import { VerificationRequest, VerificationResponse, VerifyOtpRequest, VerifyOtpResponse } from '../types/verification';
import { MockMemberData } from './verificationServiceData';
import { ProfileLockManager } from './ProfileLockManager';
import { OtpStoreManager } from './OtpStoreManager';
import { OtpServiceHandlers } from './OtpService.handlers';

const profileLockManager = new ProfileLockManager();
const otpStoreManager = new OtpStoreManager();

export class OtpService {
  private mockMemberData = new MockMemberData();
  private handlers: OtpServiceHandlers;

  constructor() {
    this.handlers = new OtpServiceHandlers(
      this.mockMemberData,
      profileLockManager,
      otpStoreManager
    );
  }

  generateAndSendOtp(data: VerificationRequest, member: any): VerificationResponse {
    return this.handlers.generateAndSendOtp(data, member);
  }

  verifyOtpAndGetUser(data: VerifyOtpRequest): VerifyOtpResponse {
    return this.handlers.verifyOtpAndGetUser(data);
  }

  cleanupExpiredOtps() {
    otpStoreManager.cleanupExpiredOtps();
  }

  canResendOtp(cardReceiptNumber: string): { canResend: boolean; message?: string } {
    this.cleanupExpiredOtps();

    if (profileLockManager.isProfileLocked(cardReceiptNumber)) {
      return {
        canResend: false,
        message: profileLockManager.getLockMessage(cardReceiptNumber)
      };
    }

    return { canResend: true };
  }

  resetProfileLock(cardReceiptNumber: string) {
    profileLockManager.resetProfile(cardReceiptNumber);
  }
}

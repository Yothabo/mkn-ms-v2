let otpStore: {
  [key: string]: {
    otp: string;
    expiresAt: number;
    contact: string;
    attempts: number;
    cardReceiptNumber: string;
  }
} = {};

export class OtpStoreManager {
  private readonly MAX_OTP_ATTEMPTS = 3;

  storeOtp(key: string, otpData: {
    otp: string;
    expiresAt: number;
    contact: string;
    attempts: number;
    cardReceiptNumber: string;
  }) {
    otpStore[key] = otpData;
  }

  getOtp(key: string) {
    return otpStore[key];
  }

  findOtpByMethod(method: string) {
    for (const key in otpStore) {
      if (key.endsWith(method)) {
        return { key, otpData: otpStore[key] };
      }
    }
    return null;
  }

  incrementAttempts(key: string) {
    if (otpStore[key]) {
      otpStore[key].attempts += 1;
    }
  }

  deleteOtp(key: string) {
    delete otpStore[key];
  }

  cleanupExpiredOtps() {
    const now = Date.now();
    Object.keys(otpStore).forEach(key => {
      if (otpStore[key].expiresAt < now) {
        delete otpStore[key];
      }
    });
  }

  getRemainingAttempts(key: string): number {
    if (!otpStore[key]) return 0;
    return this.MAX_OTP_ATTEMPTS - otpStore[key].attempts;
  }

  hasMaxAttempts(key: string): boolean {
    if (!otpStore[key]) return false;
    return otpStore[key].attempts >= this.MAX_OTP_ATTEMPTS;
  }

  isExpired(key: string): boolean {
    if (!otpStore[key]) return true;
    return Date.now() > otpStore[key].expiresAt;
  }
}

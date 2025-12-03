export class ProfileLockManager {
  private readonly STORAGE_KEY = 'mkn_profile_locks';
  private readonly OTP_REQUESTS_KEY = 'mkn_otp_requests';
  private readonly LOCK_DURATION = 60 * 60 * 1000; // 1 hour
  private readonly MAX_OTP_REQUESTS = 3;

  isProfileLocked(profileNumber: string): boolean {
    const locks = this.getLocks();
    const lock = locks[profileNumber];

    if (lock && lock.lockUntil > Date.now()) {
      return true;
    }

    // Clean up expired lock and reset request count
    if (lock && lock.lockUntil <= Date.now()) {
      console.log(`ProfileLockManager - Lock expired for ${profileNumber}, resetting`);
      this.removeLock(profileNumber);
      this.resetOtpRequests(profileNumber);
    }

    return false;
  }

  getLockMessage(profileNumber: string): string {
    const locks = this.getLocks();
    const lock = locks[profileNumber];

    if (lock && lock.lockUntil > Date.now()) {
      const timeLeft = Math.ceil((lock.lockUntil - Date.now()) / 1000 / 60);
      return `This profile has been locked due to too many verification attempts. Please try again in ${timeLeft} minutes.`;
    }

    return '';
  }

  recordOtpRequest(profileNumber: string): number {
    const requests = this.getOtpRequests();
    const currentCount = (requests[profileNumber] || 0) + 1;

    console.log(`ProfileLockManager - OTP Request ${currentCount}/${this.MAX_OTP_REQUESTS} for profile ${profileNumber}`);

    // If this is the 3rd OTP request, lock the profile
    if (currentCount >= this.MAX_OTP_REQUESTS) {
      this.lockProfile(profileNumber);
    }

    requests[profileNumber] = currentCount;
    this.saveOtpRequests(requests);

    return currentCount;
  }

  getOtpRequestCount(profileNumber: string): number {
    const requests = this.getOtpRequests();
    return requests[profileNumber] || 0;
  }

  lockProfile(profileNumber: string): void {
    const locks = this.getLocks();
    locks[profileNumber] = {
      lockUntil: Date.now() + this.LOCK_DURATION
    };
    console.log(`ProfileLockManager - PROFILE ${profileNumber} LOCKED for 1 hour`);
    this.saveLocks(locks);
  }

  resetProfile(profileNumber: string): void {
    this.removeLock(profileNumber);
    this.resetOtpRequests(profileNumber);
  }

  private getLocks(): { [profileNumber: string]: { lockUntil: number } } {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  private saveLocks(locks: { [profileNumber: string]: { lockUntil: number } }): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(locks));
    } catch (error) {
      console.error('Failed to save profile locks:', error);
    }
  }

  private removeLock(profileNumber: string): void {
    const locks = this.getLocks();
    delete locks[profileNumber];
    this.saveLocks(locks);
  }

  private getOtpRequests(): { [profileNumber: string]: number } {
    try {
      const stored = localStorage.getItem(this.OTP_REQUESTS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  private saveOtpRequests(requests: { [profileNumber: string]: number }): void {
    try {
      localStorage.setItem(this.OTP_REQUESTS_KEY, JSON.stringify(requests));
    } catch (error) {
      console.error('Failed to save OTP requests:', error);
    }
  }

  private resetOtpRequests(profileNumber: string): void {
    const requests = this.getOtpRequests();
    delete requests[profileNumber];
    this.saveOtpRequests(requests);
    console.log(`ProfileLockManager - Reset OTP requests for ${profileNumber}`);
  }
}

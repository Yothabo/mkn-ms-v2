export type Gender = 'male' | 'female' | 'other';
export type MemberStatus = 'active' | 'inactive' | 'ra' | 'preRa' | 'deceased';
export type Position = 'facilitator' | 'evangelist' | 'messenger' | 'member' | 'songster' | 'steward' | 'conciliator' | 'clerk';
export type PurityStatus = 'virgin' | 'none' | 'inapplicable';

export interface NextOfKin {
  name: string;
  surname: string;
  phone: string;
  email?: string;
}

export interface DeceasedInfo {
  dateOfDeath: string;
  cause: string;
  burialDate: string;
}

export interface Member {
  // Personal Information
  id: string;
  name: string;
  surname: string;
  cardNumber?: number;
  receiptNumber?: string;
  gender: Gender;
  dateOfBirth: string;
  phone: string;
  email?: string;

  // Membership Information
  dateOfEntry: string;
  reasonOfEntry: string;
  nextOfKin: NextOfKin;
  address: string;

  // RA System
  raCount: number;
  raLock: boolean;
  status: MemberStatus;

  // Position & Purity
  position: Position;
  purity: PurityStatus;

  // RA Removal (if applicable)
  raRemovalDate?: string;
  raRemovalReason?: string;

  // Branch & Attendance
  mainBranch: string;
  lastAttendance: string;

  // Deceased Information (if applicable)
  deceasedInfo?: DeceasedInfo;

  // Additional fields for duty assignments
  isYouth?: boolean;
  isFemale?: boolean;
}

// Helper functions for RA logic - STRICT 90+ days = RA, 60-89 days = Pre-RA
export const calculateRACount = (lastAttendance: string): number => {
  const lastAttended = new Date(lastAttendance);
  const today = new Date();
  const daysSinceLastAttendance = Math.floor((today.getTime() - lastAttended.getTime()) / (1000 * 60 * 60 * 24));

  return Math.floor(daysSinceLastAttendance / 90);
};

export const getMemberStatus = (member: Member): MemberStatus => {
  const raCount = calculateRACount(member.lastAttendance);

  if (member.status === 'deceased') return 'deceased';
  if (member.raLock) return 'inactive';

  const lastAttended = new Date(member.lastAttendance);
  const today = new Date();
  const daysSinceLastAttendance = Math.floor((today.getTime() - lastAttended.getTime()) / (1000 * 60 * 60 * 24));
  const daysUntilRA = 90 - daysSinceLastAttendance;

  // STRICT: 90+ days = RA
  if (raCount >= 1) {
    if (raCount >= 3) {
      member.raLock = true;
      return 'inactive';
    }
    return 'ra';
  } 
  // STRICT: 60-89 days = Pre-RA
  else if (daysUntilRA <= 30 && daysUntilRA > 0) {
    return 'preRa';
  }

  return 'active';
};

export const isEligibleForCardNumber = (dateOfEntry: string): boolean => {
  const entryDate = new Date(dateOfEntry);
  const today = new Date();
  const monthsSinceEntry = (today.getFullYear() - entryDate.getFullYear()) * 12 + (today.getMonth() - entryDate.getMonth());
  return monthsSinceEntry >= 3;
};

// Guest attendance handling
export interface GuestAttendance {
  memberId: string;
  branchId: string;
  serviceDate: string;
  serviceTime: 'morning' | 'afternoon' | 'evening';
  timestamp: string;
}

export const handleGuestAttendance = (memberId: string, branchId: string, serviceDate: string, serviceTime: 'morning' | 'afternoon' | 'evening'): GuestAttendance => {
  return {
    memberId,
    branchId,
    serviceDate,
    serviceTime,
    timestamp: new Date().toISOString()
  };
};

export class MemberDatabase {
  private guestAttendances: GuestAttendance[] = [];

  recordAttendance(memberId: string, branchId: string, serviceDate: string, serviceTime: 'morning' | 'afternoon' | 'evening', isMainBranch: boolean = false) {
    if (!isMainBranch) {
      const guestAttendance = handleGuestAttendance(memberId, branchId, serviceDate, serviceTime);
      this.guestAttendances.push(guestAttendance);
    }

    // Update member's last attendance date would happen here
  }

  getGuestAttendances(memberId: string): GuestAttendance[] {
    return this.guestAttendances.filter(att => att.memberId === memberId);
  }

  getBranchGuestAttendances(branchId: string): GuestAttendance[] {
    return this.guestAttendances.filter(att => att.branchId === branchId);
  }
}

export const memberDB = new MemberDatabase();

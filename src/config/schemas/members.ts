export type Gender = 'male' | 'female' | 'other';
export type MemberStatus = 'active' | 'preRa' | 'ra' | 'inactive' | 'deceased';
export type PurityStatus = 'virgin' | 'none' | 'inapplicable';

export interface NextOfKin {
  name: string;
  surname: string;
  relationship: string;
  phone: string;
  address: string;
}

export interface DeceasedInfo {
  dateOfDeath: string;
  causeOfDeath: string;
  burialPlace: string;
}

export interface Member {
  id: string;
  name: string;
  surname: string;
  gender: Gender;
  dateOfBirth: string;
  phone: string;
  email?: string;
  dateOfEntry: string;
  raCount: number;
  raLock: boolean;
  status: MemberStatus;
  position: string;
  purity: PurityStatus;
  mainBranch: string;
  lastAttendance: string;
  cardNumber?: number;
  receiptNumber?: string;
}

import { Gender, MemberStatus, Position, PurityStatus, Member } from '../../../config/members';

export interface RAHistory {
  raStartDate: string;
  raEndDate?: string;
  raRemovalReason?: string;
}

export interface ExtendedMember extends Member {
  address: string;
  reasonOfEntry: string;
  deceasedInfo?: {
    dateOfDeath: string;
    causeOfDeath: string;
    burialPlace: string;
  };
  raHistory?: RAHistory[];
  nextOfKin: {
    name: string;
    surname: string;
    relationship: string;
    phone: string;
    address: string;
  };
  isYouth?: boolean;
  isFemale?: boolean;
}

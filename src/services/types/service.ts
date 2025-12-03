import { Service } from '../../config/schemas/services';
import { Position } from '../../config/schemas/duties';

export interface ServiceAttendance {
  memberId: string;
  serviceId: string;
  timestamp: Date;
  checkedIn: boolean;
}

export interface ChurchMember {
  id: string;
  name: string;
  position: Position;
  isYouth?: boolean;
  virginityStatus?: boolean;
  isFemale?: boolean;
}

export interface AssignedDuty {
  dutyId: string;
  memberId: string;
  serviceId: string;
  date: string;
  time: 'morning' | 'afternoon' | 'evening';
  status: 'assigned' | 'completed' | 'absent';
}

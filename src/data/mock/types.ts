import { Gender, MemberStatus, Position, PurityStatus, NextOfKin, DeceasedInfo, Member } from '../../../config/members';

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

export const generatePhoneNumber = (country: string): string => {
  const prefixes: Record<string, string[]> = {
    'Zimbabwe': ['+26377', '+26378', '+26371', '+26373'],
    'South Africa': ['+2771', '+2772', '+2773', '+2778', '+2779'],
    'Botswana': ['+26771', '+26772', '+26773', '+26774']
  };
  const countryPrefixes = prefixes[country] || ['+26377'];
  const prefix = countryPrefixes[Math.floor(Math.random() * countryPrefixes.length)];
  const number = Math.floor(1000000 + Math.random() * 9000000);
  return `${prefix}${number}`;
};

export const generateCardNumber = (): number => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const generateReceiptNumber = (): string => {
  const year = new Date().getFullYear();
  const sequence = Math.floor(1000 + Math.random() * 9000);
  return `RCPT${year}${sequence}`;
};

export const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const getPurityStatus = (age: number, gender: Gender, position?: Position): PurityStatus => {
  if (position === 'evangelist' || position === 'messenger') {
    return 'inapplicable';
  }
  if (age >= 35) return 'inapplicable';
  if (age < 18) return 'virgin';
  const random = Math.random();
  if (random < 0.3) return 'virgin';
  if (random < 0.8) return 'none';
  return 'inapplicable';
};

export const getPositionByAge = (age: number, isNewMember: boolean = false): Position => {
  if (isNewMember) {
    return 'member';
  }
  
  if (age >= 50) {
    const seniorRoles: Position[] = ['conciliator', 'steward', 'facilitator'];
    return seniorRoles[Math.floor(Math.random() * seniorRoles.length)];
  }
  if (age >= 40) {
    const midRoles: Position[] = ['facilitator', 'clerk', 'evangelist', 'steward'];
    return midRoles[Math.floor(Math.random() * midRoles.length)];
  }
  if (age >= 25) {
    const adultRoles: Position[] = ['messenger', 'songster', 'member', 'clerk'];
    return adultRoles[Math.floor(Math.random() * adultRoles.length)];
  }
  if (age >= 18) {
    const youthRoles: Position[] = ['songster', 'member'];
    return youthRoles[Math.floor(Math.random() * youthRoles.length)];
  }
  return 'member';
};

export const calculateDaysSinceLastAttendance = (lastAttendance: string): number => {
  const lastAttended = new Date(lastAttendance);
  const today = new Date();
  return Math.floor((today.getTime() - lastAttended.getTime()) / (1000 * 60 * 60 * 24));
};

export const calculateStatus = (lastAttendance: string, raHistory?: RAHistory[]): { status: MemberStatus; raCount: number } => {
  const daysAbsent = calculateDaysSinceLastAttendance(lastAttendance);
  const pastRAs = raHistory ? raHistory.filter(ra => ra.raEndDate).length : 0;

  if (pastRAs >= 3) {
    return { status: 'inactive', raCount: pastRAs };
  }

  if (daysAbsent >= 90) {
    return { status: 'ra', raCount: pastRAs };
  }

  if (daysAbsent >= 60) {
    return { status: 'preRa', raCount: pastRAs };
  }

  return { status: 'active', raCount: pastRAs };
};

export const generateRAHistory = (member: ExtendedMember): RAHistory[] => {
  const history: RAHistory[] = [];
  const today = new Date();

  const hasCurrentRA = member.status === 'ra';
  const memberYearsInChurch = Math.floor((today.getTime() - new Date(member.dateOfEntry).getTime()) / (1000 * 60 * 60 * 24 * 365));

  let pastRACount = 0;

  if (memberYearsInChurch >= 3) {
    pastRACount = Math.min(3, Math.floor(Math.random() * 4));
  } else if (memberYearsInChurch >= 2) {
    pastRACount = Math.min(2, Math.floor(Math.random() * 3));
  } else if (memberYearsInChurch >= 1) {
    pastRACount = Math.min(1, Math.floor(Math.random() * 2));
  }

  for (let i = 0; i < pastRACount; i++) {
    const yearsAgo = i + 1;
    const raStartDate = new Date();
    raStartDate.setFullYear(raStartDate.getFullYear() - yearsAgo);
    raStartDate.setMonth(Math.floor(Math.random() * 12));
    raStartDate.setDate(Math.floor(Math.random() * 28) + 1);

    const raEndDate = new Date(raStartDate);
    raEndDate.setMonth(raEndDate.getMonth() + 3 + Math.floor(Math.random() * 6));

    history.push({
      raStartDate: raStartDate.toISOString().split('T')[0],
      raEndDate: raEndDate.toISOString().split('T')[0],
      raRemovalReason: raRemovalReasons[Math.floor(Math.random() * raRemovalReasons.length)]
    });
  }

  if (hasCurrentRA) {
    const currentRAStart = new Date();
    currentRAStart.setDate(currentRAStart.getDate() - (90 + Math.floor(Math.random() * 60)));

    history.push({
      raStartDate: currentRAStart.toISOString().split('T')[0],
      raEndDate: undefined,
      raRemovalReason: undefined
    });
  }

  return history;
};

export const calculateRALock = (raHistory?: RAHistory[]): boolean => {
  if (!raHistory) return false;
  const pastRAs = raHistory.filter(ra => ra.raEndDate).length;
  return pastRAs >= 3;
};

export const spiritualReasons = [
  'Spiritual attacks and nightmares',
  'Could not sleep at night, troubled by spirits',
  'Seeking protection from ancestral spirits',
  'Dreams guiding me to this path',
  'Family spiritual heritage',
  'Seeking peace from restless spirits',
  'Guidance from the spiritual realm',
  'Protection from evil eye',
  'Healing from spiritual afflictions',
  'Answering the call of ancestors'
];

export const raRemovalReasons = [
  "Was on school holidays",
  "Was outside the country",
  "Had lost faith",
  "Was dealing with personal challenges",
  "Was focusing on studies",
  "Had family responsibilities",
  "Faced health issues",
  "Had work commitments",
  "Relocated temporarily",
  "Had transportation difficulties"
];

export const relationships = [
  'parent',
  'spouse',
  'child',
  'sibling',
  'other'
];

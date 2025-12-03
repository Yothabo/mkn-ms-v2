import { ExtendedMember } from './interfaces';
import { 
  generatePhoneNumber, 
  generateCardNumber, 
  generateReceiptNumber, 
  calculateAge, 
  getPurityStatus, 
  getPositionByAge, 
  calculateStatus, 
  spiritualReasons, 
  raRemovalReasons, 
  relationships, 
  generateRAHistory,
  getCountryNames 
} from './memberUtils';

const generateName = (branch: string, gender: 'male' | 'female' | 'other') => {
  const { male, female, surnames } = getCountryNames(branch);
  
  if (gender === 'other') {
    const names = [...male, ...female];
    return { 
      name: names[Math.floor(Math.random() * names.length)], 
      surname: surnames[Math.floor(Math.random() * surnames.length)] 
    };
  }
  
  const firstNames = gender === 'male' ? male : female;
  return { 
    name: firstNames[Math.floor(Math.random() * firstNames.length)], 
    surname: surnames[Math.floor(Math.random() * surnames.length)] 
  };
};

const generateDOB = (minAge: number, maxAge: number): string => {
  const birthYear = new Date().getFullYear() - (minAge + Math.floor(Math.random() * (maxAge - minAge)));
  const month = Math.floor(Math.random() * 12) + 1; 
  const day = Math.floor(Math.random() * 28) + 1;
  return `${birthYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

const generateDateOfEntry = (isNewMember: boolean): string => {
  const entryDate = new Date();
  if (isNewMember) {
    entryDate.setDate(entryDate.getDate() - Math.floor(Math.random() * 90));
  } else { 
    entryDate.setFullYear(entryDate.getFullYear() - (Math.floor(Math.random() * 5) + 1)); 
    entryDate.setMonth(Math.floor(Math.random() * 12)); 
    entryDate.setDate(Math.floor(Math.random() * 28) + 1); 
  }
  return entryDate.toISOString().split('T')[0];
};

const generateLastAttendance = (status: 'active' | 'preRa' | 'ra' | 'inactive' | 'deceased', isNewMember: boolean): string => {
  if (status === 'deceased') { 
    const deceasedDate = new Date(); 
    deceasedDate.setDate(deceasedDate.getDate() - Math.floor(Math.random() * 365)); 
    return deceasedDate.toISOString().split('T')[0]; 
  }
  
  const today = new Date(); 
  const lastAttended = new Date(today);
  
  if (isNewMember) {
    lastAttended.setDate(today.getDate() - Math.floor(Math.random() * 30));
  } else {
    const daysAbsent = { 
      active: Math.floor(Math.random() * 30), 
      preRa: 60 + Math.floor(Math.random() * 29), 
      ra: 90 + Math.floor(Math.random() * 180), 
      inactive: 365 + Math.floor(Math.random() * 365) 
    }[status];
    lastAttended.setDate(today.getDate() - daysAbsent);
  }
  
  return lastAttended.toISOString().split('T')[0];
};

export const createMember = (i: number, branch: string, gender: 'male' | 'female' | 'other', status: 'active' | 'preRa' | 'ra' | 'inactive' | 'deceased', isNewMember: boolean): ExtendedMember => {
  const { name, surname } = generateName(branch, gender);
  const { country, surnames: localSurnames } = getCountryNames(branch);
  const dob = generateDOB(isNewMember ? 18 : 12, isNewMember ? 40 : 80);
  const age = calculateAge(dob);
  const lastAttendance = generateLastAttendance(status, isNewMember);
  const dateOfEntry = generateDateOfEntry(isNewMember);
  
  const nextOfKinGender = gender === 'male' ? 'female' : gender === 'female' ? 'male' : Math.random() > 0.5 ? 'male' : 'female';
  const { male: maleNames, female: femaleNames } = getCountryNames(branch);
  const nextOfKinName = nextOfKinGender === 'male' 
    ? maleNames[Math.floor(Math.random() * maleNames.length)] 
    : femaleNames[Math.floor(Math.random() * femaleNames.length)];

  const member: ExtendedMember = {
    id: `${branch}-${i.toString().padStart(3, '0')}`, 
    name, 
    surname, 
    gender, 
    dateOfBirth: dob, 
    phone: generatePhoneNumber(country),
    email: Math.random() > 0.3 ? `${name.toLowerCase()}.${surname.toLowerCase()}@gmail.com` : undefined, 
    dateOfEntry,
    reasonOfEntry: spiritualReasons[Math.floor(Math.random() * spiritualReasons.length)],
    nextOfKin: { 
      name: nextOfKinName, 
      surname, 
      relationship: relationships[Math.floor(Math.random() * relationships.length)], 
      phone: generatePhoneNumber(country), 
      address: `${Math.floor(Math.random() * 100) + 1} ${localSurnames[Math.floor(Math.random() * localSurnames.length)]} Street, ${branch}` 
    },
    address: `${Math.floor(Math.random() * 100) + 1} ${localSurnames[Math.floor(Math.random() * localSurnames.length)]} Street, ${branch}`, 
    raCount: 0, 
    raLock: false, 
    status,
    position: getPositionByAge(age, isNewMember), 
    purity: getPurityStatus(age, gender), 
    mainBranch: branch, 
    lastAttendance,
    isYouth: age >= 13 && age <= 35, 
    isFemale: gender === 'female', 
    raHistory: []
  };

  if (isNewMember) {
    member.receiptNumber = generateReceiptNumber();
  } else {
    member.cardNumber = generateCardNumber();
  }

  if (status === 'deceased') {
    member.deceasedInfo = { 
      dateOfDeath: lastAttendance, 
      causeOfDeath: ['Natural causes', 'Illness', 'Accident'][Math.floor(Math.random() * 3)], 
      burialPlace: `${Math.floor(Math.random() * 100) + 1} ${localSurnames[Math.floor(Math.random() * localSurnames.length)]} Cemetery, ${branch}` 
    };
  } else if (status !== 'deceased') {
    member.raHistory = generateRAHistory(member);
    const { status: calculatedStatus, raCount } = calculateStatus(member.lastAttendance, member.raHistory);
    member.status = status === 'deceased' ? 'deceased' : calculatedStatus;
    member.raCount = raCount;
    member.raLock = member.raHistory.filter(ra => ra.raEndDate).length >= 3;
  }

  return member;
};

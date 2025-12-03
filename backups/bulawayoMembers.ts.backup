import { ExtendedMember, RAHistory } from '../types';
import { generatePhoneNumber, generateCardNumber, generateReceiptNumber, calculateAge, getPurityStatus, getPositionByAge, calculateStatus, spiritualReasons, raRemovalReasons, relationships, generateRAHistory, calculateDaysSinceLastAttendance } from '../types';

const maleNames = ['Sipho', 'Thabo', 'Bongani', 'Mandla', 'Sibusiso', 'Jabulani', 'Nkosinathi', 'Mthunzi', 'Lungile', 'Sikhumbuzo'];
const femaleNames = ['Nomvula', 'Thandeka', 'Nokuthula', 'Zanele', 'Nompumelelo', 'Sibongile', 'Ntombizodwa', 'Nolwazi', 'Samukelisiwe', 'Nobuhle'];
const surnames = ['Ndlovu', 'Khumalo', 'Moyo', 'Nkala', 'Mhlanga', 'Dube', 'Mpofu', 'Tshuma', 'Sibanda', 'Ncube'];

const generateName = (gender: 'male' | 'female' | 'other') => {
  if (gender === 'other') {
    const names = [...maleNames, ...femaleNames];
    const name = names[Math.floor(Math.random() * names.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    return { name, surname };
  }
  const firstNames = gender === 'male' ? maleNames : femaleNames;
  const name = firstNames[Math.floor(Math.random() * firstNames.length)];
  const surname = surnames[Math.floor(Math.random() * surnames.length)];
  return { name, surname };
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
    switch (status) {
      case 'active':
        lastAttended.setDate(today.getDate() - Math.floor(Math.random() * 30));
        break;
      case 'preRa':
        lastAttended.setDate(today.getDate() - (60 + Math.floor(Math.random() * 29)));
        break;
      case 'ra':
        lastAttended.setDate(today.getDate() - (90 + Math.floor(Math.random() * 180)));
        break;
      case 'inactive':
        lastAttended.setDate(today.getDate() - (365 + Math.floor(Math.random() * 365)));
        break;
    }
  }

  return lastAttended.toISOString().split('T')[0];
};

export const bulawayoMembers: ExtendedMember[] = [];

for (let i = 1; i <= 10; i++) {
  const gender: 'male' | 'female' | 'other' = i <= 9 ? (Math.random() > 0.5 ? 'male' : 'female') : 'other';
  const { name, surname } = generateName(gender);
  const dob = generateDOB(18, 40);
  const age = calculateAge(dob);

  const isNewMember = true;
  const lastAttendance = generateLastAttendance('active', isNewMember);
  const dateOfEntry = generateDateOfEntry(isNewMember);

  const member: ExtendedMember = {
    id: `bul-${i.toString().padStart(3, '0')}`,
    name,
    surname,
    gender,
    dateOfBirth: dob,
    phone: generatePhoneNumber('Zimbabwe'),
    email: Math.random() > 0.3 ? `${name.toLowerCase()}.${surname.toLowerCase()}@gmail.com` : undefined,
    dateOfEntry,
    reasonOfEntry: spiritualReasons[Math.floor(Math.random() * spiritualReasons.length)],
    nextOfKin: {
      name: gender === 'male' ? femaleNames[Math.floor(Math.random() * femaleNames.length)] :
            gender === 'female' ? maleNames[Math.floor(Math.random() * maleNames.length)] :
            Math.random() > 0.5 ? maleNames[Math.floor(Math.random() * maleNames.length)] : femaleNames[Math.floor(Math.random() * femaleNames.length)],
      surname,
      relationship: relationships[Math.floor(Math.random() * relationships.length)],
      phone: generatePhoneNumber('Zimbabwe'),
      address: `${Math.floor(Math.random() * 100) + 1} ${surnames[Math.floor(Math.random() * surnames.length)]} Street, Bulawayo`
    },
    address: `${Math.floor(Math.random() * 100) + 1} ${surnames[Math.floor(Math.random() * surnames.length)]} Street, Bulawayo`,
    raCount: 0,
    raLock: false,
    status: 'active',
    position: getPositionByAge(age, isNewMember),
    purity: getPurityStatus(age, gender),
    mainBranch: 'bulawayo-hq',
    lastAttendance,
    isYouth: age >= 13 && age <= 35,
    isFemale: gender === 'female',
    receiptNumber: generateReceiptNumber(),
    raHistory: []
  };

  bulawayoMembers.push(member);
}

for (let i = 11; i <= 50; i++) {
  const gender: 'male' | 'female' | 'other' = i <= 45 ? (Math.random() > 0.5 ? 'male' : 'female') : 'other';
  const { name, surname } = generateName(gender);
  const dob = generateDOB(12, 80);
  const age = calculateAge(dob);

  let status: 'active' | 'preRa' | 'ra' | 'inactive' | 'deceased';
  if (i <= 30) status = 'active';
  else if (i <= 36) status = 'preRa';
  else if (i <= 40) status = 'ra';
  else if (i <= 45) status = 'inactive';
  else status = 'deceased';

  const isNewMember = false;
  const lastAttendance = generateLastAttendance(status, isNewMember);
  const dateOfEntry = generateDateOfEntry(isNewMember);

  const member: ExtendedMember = {
    id: `bul-${i.toString().padStart(3, '0')}`,
    name,
    surname,
    gender,
    dateOfBirth: dob,
    phone: generatePhoneNumber('Zimbabwe'),
    email: Math.random() > 0.3 ? `${name.toLowerCase()}.${surname.toLowerCase()}@gmail.com` : undefined,
    dateOfEntry,
    reasonOfEntry: spiritualReasons[Math.floor(Math.random() * spiritualReasons.length)],
    nextOfKin: {
      name: gender === 'male' ? femaleNames[Math.floor(Math.random() * femaleNames.length)] :
            gender === 'female' ? maleNames[Math.floor(Math.random() * maleNames.length)] :
            Math.random() > 0.5 ? maleNames[Math.floor(Math.random() * maleNames.length)] : femaleNames[Math.floor(Math.random() * femaleNames.length)],
      surname,
      relationship: relationships[Math.floor(Math.random() * relationships.length)],
      phone: generatePhoneNumber('Zimbabwe'),
      address: `${Math.floor(Math.random() * 100) + 1} ${surnames[Math.floor(Math.random() * surnames.length)]} Street, Bulawayo`
    },
    address: `${Math.floor(Math.random() * 100) + 1} ${surnames[Math.floor(Math.random() * surnames.length)]} Street, Bulawayo`,
    raCount: 0,
    raLock: false,
    status,
    position: getPositionByAge(age, isNewMember),
    purity: getPurityStatus(age, gender),
    mainBranch: 'bulawayo-hq',
    lastAttendance,
    isYouth: age >= 13 && age <= 35,
    isFemale: gender === 'female',
    cardNumber: generateCardNumber()
  };

  if (status === 'deceased') {
    member.deceasedInfo = {
      dateOfDeath: lastAttendance,
      causeOfDeath: ['Natural causes', 'Illness', 'Accident'][Math.floor(Math.random() * 3)],
      burialPlace: `${Math.floor(Math.random() * 100) + 1} ${surnames[Math.floor(Math.random() * surnames.length)]} Cemetery, Bulawayo`
    };
  }

  if (status !== 'deceased') {
    member.raHistory = generateRAHistory(member);

    const { status: calculatedStatus, raCount } = calculateStatus(member.lastAttendance, member.raHistory);
    member.status = status === 'deceased' ? 'deceased' : calculatedStatus;
    member.raCount = raCount;
    member.raLock = member.raHistory.filter(ra => ra.raEndDate).length >= 3;
  }

  bulawayoMembers.push(member);
}

export default bulawayoMembers;

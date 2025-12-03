import { ExtendedMember, RAHistory } from '../types';
import { generatePhoneNumber, generateCardNumber, generateReceiptNumber, calculateAge, getPurityStatus, getPositionByAge, calculateStatus, spiritualReasons, raRemovalReasons, relationships, generateRAHistory, calculateDaysSinceLastAttendance } from '../types';

const maleNames = ['Kagiso', 'Oabile', 'Tshepo', 'Kabelo', 'Boitumelo', 'Lesedi', 'Oratile', 'Goitse', 'Thato', 'Karabo'];
const femaleNames = ['Amantle', 'Bontle', 'Dineo', 'Gofaone', 'Kelebogile', 'Lorato', 'Masego', 'Neo', 'Phenyo', 'Tumelo'];
const surnames = ['Mogapi', 'Kgosi', 'Ramatlapeng', 'Sechele', 'Mokgosi', 'Phiri', 'Banda', 'Khumo', 'Tshireletso', 'Motsumi'];

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

const generateDateOfEntry = (yearsAgo: number): string => {
  const entryDate = new Date();
  entryDate.setFullYear(entryDate.getFullYear() - yearsAgo);
  entryDate.setMonth(Math.floor(Math.random() * 12));
  entryDate.setDate(Math.floor(Math.random() * 28) + 1);
  return entryDate.toISOString().split('T')[0];
};

const generateLastAttendance = (status: 'active' | 'preRa' | 'ra' | 'inactive' | 'deceased'): string => {
  if (status === 'deceased') {
    const deceasedDate = new Date();
    deceasedDate.setDate(deceasedDate.getDate() - Math.floor(Math.random() * 365));
    return deceasedDate.toISOString().split('T')[0];
  }

  const today = new Date();
  const lastAttended = new Date(today);

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

  return lastAttended.toISOString().split('T')[0];
};

export const gaboroneMembers: ExtendedMember[] = [];

for (let i = 1; i <= 50; i++) {
  const gender: 'male' | 'female' | 'other' = i <= 45 ? (Math.random() > 0.5 ? 'male' : 'female') : 'other';
  const { name, surname } = generateName(gender);
  const dob = generateDOB(12, 80);
  const age = calculateAge(dob);

  let status: 'active' | 'preRa' | 'ra' | 'inactive' | 'deceased';
  if (i <= 30) status = 'active';
  else if (i <= 38) status = 'preRa';
  else if (i <= 42) status = 'ra';
  else if (i <= 47) status = 'inactive';
  else status = 'deceased';

  const lastAttendance = generateLastAttendance(status);
  const dateOfEntry = generateDateOfEntry(Math.floor(Math.random() * 2) + 1);
  const isNewMember = calculateAge(dateOfEntry) < 0.25;

  const member: ExtendedMember = {
    id: `gab-${i.toString().padStart(3, '0')}`,
    name,
    surname,
    gender,
    dateOfBirth: dob,
    phone: generatePhoneNumber('Botswana'),
    email: Math.random() > 0.4 ? `${name.toLowerCase()}.${surname.toLowerCase()}@gmail.com` : undefined,
    dateOfEntry,
    reasonOfEntry: spiritualReasons[Math.floor(Math.random() * spiritualReasons.length)],
    nextOfKin: {
      name: gender === 'male' ? femaleNames[Math.floor(Math.random() * femaleNames.length)] :
            gender === 'female' ? maleNames[Math.floor(Math.random() * maleNames.length)] :
            Math.random() > 0.5 ? maleNames[Math.floor(Math.random() * maleNames.length)] : femaleNames[Math.floor(Math.random() * femaleNames.length)],
      surname,
      relationship: relationships[Math.floor(Math.random() * relationships.length)],
      phone: generatePhoneNumber('Botswana'),
      address: `${Math.floor(Math.random() * 100) + 1} ${surnames[Math.floor(Math.random() * surnames.length)]} Street, Gaborone`
    },
    address: `${Math.floor(Math.random() * 100) + 1} ${surnames[Math.floor(Math.random() * surnames.length)]} Street, Gaborone`,
    raCount: 0,
    raLock: false,
    status,
    position: getPositionByAge(age, isNewMember),
    purity: getPurityStatus(age, gender),
    mainBranch: 'gaborone',
    lastAttendance,
    isYouth: age >= 13 && age <= 35,
    isFemale: gender === 'female'
  };

  if (status === 'deceased') {
    member.deceasedInfo = {
      dateOfDeath: lastAttendance,
      causeOfDeath: ['Natural causes', 'Illness', 'Accident'][Math.floor(Math.random() * 3)],
      burialPlace: `${Math.floor(Math.random() * 100) + 1} ${surnames[Math.floor(Math.random() * surnames.length)]} Cemetery, Gaborone`
    };
  }

  if (isNewMember) {
    member.receiptNumber = generateReceiptNumber();
  } else {
    member.cardNumber = generateCardNumber();
  }

  member.raHistory = generateRAHistory(member);

  const { status: calculatedStatus, raCount } = calculateStatus(member.lastAttendance, member.raHistory);
  member.status = status === 'deceased' ? 'deceased' : calculatedStatus;
  member.raCount = raCount;
  member.raLock = member.raHistory.filter(ra => ra.raEndDate).length >= 3;

  gaboroneMembers.push(member);
}

export default gaboroneMembers;

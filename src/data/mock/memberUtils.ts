// Country-specific phone number generators
export const generatePhoneNumber = (country: string): string => {
  const countryCodes: { [key: string]: string } = {
    'Zimbabwe': '+263',
    'Botswana': '+267', 
    'South Africa': '+27'
  };
  
  const prefixes: { [key: string]: string[] } = {
    'Zimbabwe': ['77', '78', '71', '73', '74', '75', '76', '79'],
    'Botswana': ['71', '72', '74', '75', '76', '77', '78', '79'],
    'South Africa': ['72', '73', '74', '76', '82', '83', '84', '85', '86', '87']
  };
  
  const code = countryCodes[country] || '+263';
  const prefixList = prefixes[country] || ['77', '78'];
  const prefix = prefixList[Math.floor(Math.random() * prefixList.length)];
  const number = Math.floor(1000000 + Math.random() * 9000000);
  
  return `${code} ${prefix} ${number.toString().slice(0, 3)} ${number.toString().slice(3)}`;
};

// Expanded country-specific name pools
export const zimbabweMaleNames = [
  'Sipho', 'Thabo', 'Bongani', 'Mandla', 'Sibusiso', 'Jabulani', 'Nkosinathi', 'Mthunzi', 'Lungile', 'Sikhumbuzo',
  'Tendai', 'Farai', 'Tawanda', 'Blessing', 'Chengetai', 'Dumisani', 'Edmore', 'Fungai', 'Garikai', 'Happiness',
  'Innocent', 'Jesmine', 'Kudakwashe', 'Lovemore', 'Munashe', 'Ngonidzashe', 'Oswald', 'Pardon', 'Quinton', 'Rangarirai',
  'Shingai', 'Takudzwa', 'Unathi', 'Vimbai', 'Wellington', 'Xavier', 'Yvonne', 'Zvikomborero', 'Anesu', 'Brian',
  'Charles', 'Donald', 'Elvis', 'Frank', 'George', 'Henry', 'Isaac', 'James', 'Kevin', 'Leo', 'Mike', 'Nathan'
];

export const zimbabweFemaleNames = [
  'Nomvula', 'Thandeka', 'Nokuthula', 'Zanele', 'Nompumelelo', 'Sibongile', 'Ntombizodwa', 'Nolwazi', 'Samukelisiwe', 'Nobuhle',
  'Rumbidzai', 'Prisca', 'Memory', 'Beauty', 'Chiedza', 'Diana', 'Ethel', 'Fadzai', 'Grace', 'Hope', 'Irene', 'Joyce',
  'Kundai', 'Lilian', 'Martha', 'Nelia', 'Olivia', 'Patience', 'Queen', 'Rebecca', 'Sandra', 'Tariro', 'Ursula', 'Violet',
  'Winnie', 'Xena', 'Yolanda', 'Zanele', 'Agnes', 'Bridget', 'Catherine', 'Dorothy', 'Eunice', 'Florence', 'Gertrude',
  'Harriet', 'Ivy', 'Josephine', 'Karen', 'Linda', 'Miriam', 'Nancy'
];

export const zimbabweSurnames = [
  'Ndlovu', 'Khumalo', 'Moyo', 'Nkala', 'Mhlanga', 'Dube', 'Mpofu', 'Tshuma', 'Sibanda', 'Ncube',
  'Moyo', 'Matshazi', 'Marewo', 'Chigumba', 'Banda', 'Chamunorwa', 'Dembedza', 'Gumbo', 'Hove', 'Jonga',
  'Kaseke', 'Mabasa', 'Machingauta', 'Ndemera', 'Pfungwane', 'Rusere', 'Shava', 'Taderera', 'Zhou', 'Mazango',
  'Chiweshe', 'Marufu', 'Nyandoro', 'Rukuni', 'Svosve', 'Tembo', 'Zvinavashe', 'Mudzingwa', 'Chidzambwa', 'Mushonga',
  'Rutsito', 'Samanyanga', 'Tichawona', 'Zishiri', 'Chakwana', 'Muchenje', 'Rungano', 'Shonhai', 'Tirivavi', 'Zinyemba'
];

export const botswanaMaleNames = [
  'Kagiso', 'Oabile', 'Thato', 'Kabo', 'Tshepo', 'Lesedi', 'Kitso', 'Onneile', 'Goitsemang', 'Mothusi',
  'Odirile', 'Tumelo', 'Bakang', 'Chedza', 'Dintle', 'Erastus', 'Fanyana', 'Gasebalwe', 'Haskins', 'Itumeleng',
  'Johan', 'Karabo', 'Lorato', 'Masego', 'Naledi', 'Onalenna', 'Pako', 'Queenie', 'Rre', 'Sello',
  'Tebogo', 'Uyapo', 'Violet', 'Wame', 'Xavier', 'Yvonne', 'Zibonele', 'Amogelang', 'Botshelo', 'Clement',
  'Dumelang', 'Elias', 'Fidel', 'Gabaone', 'Hillary', 'Ishmael', 'Jacob', 'Kabelo', 'Lebo', 'Mpho'
];

export const botswanaFemaleNames = [
  'Amantle', 'Boipelo', 'Dineo', 'Gofaone', 'Kefilwe', 'Lorato', 'Masego', 'Neo', 'Pulane', 'Tshegofatso',
  'Wame', 'Yvonne', 'Aobakwe', 'Bontle', 'Catherine', 'Dikeledi', 'Esinah', 'Florence', 'Gloria', 'Happiness',
  'Irene', 'Joy', 'Kgomotso', 'Lerato', 'Malebogo', 'Nthabiseng', 'Olebogeng', 'Precious', 'Queen', 'Refilwe',
  'Sandra', 'Tebogo', 'Unami', 'Violet', 'Wendy', 'Xenia', 'Yolanda', 'Zanele', 'Agnes', 'Bridget',
  'Catherine', 'Dorcas', 'Elizabeth', 'Faith', 'Grace', 'Hope', 'Ivy', 'Joyce', 'Keneilwe', 'Lorraine'
];

export const botswanaSurnames = [
  'Mogwe', 'Kgosi', 'Seboni', 'Mothibi', 'Phiri', 'Mokgosi', 'Rantao', 'Sebele', 'Mogotsi', 'Tshireletso',
  'Motsumi', 'Kwere', 'Batsalelwang', 'Dintwa', 'Gaolathe', 'Kgori', 'Mafoko', 'Ntsima', 'Pitse', 'Ramatlapeng',
  'Sekgoma', 'Thobega', 'Woto', 'Xaba', 'Yankho', 'Zwide', 'Baipidi', 'Dikgaka', 'Gaborone', 'Jankie',
  'Kgosiemang', 'Mmutle', 'Ntloedibe', 'Peloetletse', 'Rra', 'Sedimo', 'Tiro', 'Wesley', 'Xhamela', 'Yeboah',
  'Zaza', 'Bantsi', 'Dikgang', 'Gaseitsiwe', 'Kgosidintsi', 'Mmolawa', 'Ntwaetsile', 'Phatsimo', 'Rrebolokwe', 'Seitshiro'
];

export const southAfricaMaleNames = [
  'Lungelo', 'Sipho', 'Mandla', 'Bongani', 'Thabiso', 'Kagiso', 'Tshepo', 'Katlego', 'Moses', 'Jacob',
  'David', 'Michael', 'Andile', 'Bheki', 'Cebo', 'Dumisani', 'Enoch', 'Fana', 'Gift', 'Hendrick',
  'Isaac', 'Johan', 'Kgosi', 'Lucky', 'Mzwandile', 'Nkosinathi', 'Obed', 'Pule', 'Quinton', 'Riaan',
  'Sello', 'Thabo', 'Vusi', 'Willem', 'Xolani', 'Yusuf', 'Zola', 'Aubrey', 'Brian', 'Chris',
  'Dean', 'Ethan', 'Frank', 'Gavin', 'Hannes', 'Ivan', 'Jason', 'Kevin', 'Liam', 'Mark'
];

export const southAfricaFemaleNames = [
  'Nompumelelo', 'Zanele', 'Precious', 'Lerato', 'Refilwe', 'Kgothatso', 'Masechaba', 'Nolwazi', 'Samukelisiwe', 'Nobuhle',
  'Sarah', 'Mary', 'Amahle', 'Buhle', 'Catherine', 'Dineo', 'Elizabeth', 'Fikile', 'Gugu', 'Hlengiwe',
  'Irene', 'Jabulile', 'Kelebogile', 'Lindiwe', 'Mamohlodi', 'Naledi', 'Onica', 'Portia', 'Queen', 'Rethabile',
  'Sibongile', 'Thandi', 'Umbali', 'Violet', 'Wendy', 'Xoli', 'Yolanda', 'Zanele', 'Annette', 'Brenda',
  'Cindy', 'Dawn', 'Elaine', 'Fiona', 'Gail', 'Heather', 'Ingrid', 'Jackie', 'Kelly', 'Lisa'
];

export const southAfricaSurnames = [
  'Dlamini', 'Zulu', 'Mbeki', 'Mandela', 'Tutu', 'Mokoena', 'Mthethwa', 'Nkosi', 'Cele', 'Pillay',
  'Naidoo', 'Patel', 'Adams', 'Botha', 'Coetzee', 'De Beer', 'Erasmus', 'Fourie', 'Grobbelaar', 'Hendricks',
  'Jacobs', 'Kruger', 'Le Roux', 'Muller', 'Nel', 'Olivier', 'Pretorius', 'Radebe', 'Smit', 'Van der Merwe',
  'Williams', 'Xaba', 'Yende', 'Zondo', 'Abrahams', 'Barnard', 'Cloete', 'Du Plessis', 'Engelbrecht', 'Ferreira',
  'Greeff', 'Hlongwane', 'Jansen', 'Khoza', 'Louw', 'Malan', 'Ndlovu', 'Oosthuizen', 'Pienaar', 'Rossouw'
];

export const getCountryNames = (branch: string) => {
  const countryMap: { [key: string]: { male: string[], female: string[], surnames: string[], country: string } } = {
    'bulawayo': { male: zimbabweMaleNames, female: zimbabweFemaleNames, surnames: zimbabweSurnames, country: 'Zimbabwe' },
    'harare': { male: zimbabweMaleNames, female: zimbabweFemaleNames, surnames: zimbabweSurnames, country: 'Zimbabwe' },
    'gaborone': { male: botswanaMaleNames, female: botswanaFemaleNames, surnames: botswanaSurnames, country: 'Botswana' },
    'johannesburg': { male: southAfricaMaleNames, female: southAfricaFemaleNames, surnames: southAfricaSurnames, country: 'South Africa' },
    'pretoria': { male: southAfricaMaleNames, female: southAfricaFemaleNames, surnames: southAfricaSurnames, country: 'South Africa' }
  };
  
  return countryMap[branch] || { male: zimbabweMaleNames, female: zimbabweFemaleNames, surnames: zimbabweSurnames, country: 'Zimbabwe' };
};

// Rest of the utility functions remain the same
export const generateCardNumber = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const generateReceiptNumber = (): string => {
  const prefix = 'RCP';
  const number = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${number}`;
};

export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const getPurityStatus = (age: number, gender: string): 'virgin' | 'none' | 'inapplicable' => {
  if (age < 18) return 'inapplicable';
  if (age > 60) return 'inapplicable';
  return Math.random() > 0.7 ? 'virgin' : 'none';
};

export const getPositionByAge = (age: number, isNewMember: boolean): string => {
  if (isNewMember) return 'member';
  if (age >= 60) return 'conciliator';
  if (age >= 40) return Math.random() > 0.5 ? 'facilitator' : 'evangelist';
  if (age >= 30) return Math.random() > 0.5 ? 'messenger' : 'steward';
  if (age >= 25) return Math.random() > 0.5 ? 'songster' : 'clerk';
  return 'member';
};

export const calculateStatus = (lastAttendance: string, raHistory: any[]): { status: string, raCount: number } => {
  const today = new Date();
  const lastAttended = new Date(lastAttendance);
  const daysSinceLastAttendance = Math.floor((today.getTime() - lastAttended.getTime()) / (1000 * 60 * 60 * 24));
  
  let raCount = raHistory.filter(ra => ra.raEndDate).length;
  
  if (daysSinceLastAttendance >= 90) {
    return { status: 'ra', raCount: raCount + 1 };
  } else if (daysSinceLastAttendance >= 60) {
    return { status: 'preRa', raCount };
  } else {
    return { status: 'active', raCount };
  }
};

export const spiritualReasons = [
  'Spiritual awakening',
  'Family tradition',
  'Personal revelation',
  'Community influence',
  'Life transformation',
  'Divine calling',
  'Seeking purpose',
  'Answered prayers'
];

export const raRemovalReasons = [
  'Relocated to different city',
  'Work commitments',
  'Family responsibilities',
  'Health issues',
  'Personal reasons',
  'Lost contact',
  'Temporary absence'
];

export const relationships = [
  'Spouse',
  'Parent',
  'Sibling',
  'Child',
  'Cousin',
  'Friend',
  'Guardian'
];

export const generateRAHistory = (member: any): any[] => {
  const history = [];
  const today = new Date();
  
  if (member.status === 'ra' || member.status === 'preRa') {
    const raStart = new Date(today);
    raStart.setDate(today.getDate() - (member.status === 'ra' ? 120 : 75));
    
    history.push({
      raStartDate: raStart.toISOString().split('T')[0],
      raEndDate: null,
      raRemovalReason: null
    });
  }
  
  // Add some past RA history for some members
  if (Math.random() > 0.7 && member.raCount > 0) {
    for (let i = 0; i < member.raCount; i++) {
      const startDate = new Date(today);
      startDate.setFullYear(startDate.getFullYear() - (i + 1));
      startDate.setMonth(Math.floor(Math.random() * 12));
      
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 2 + Math.floor(Math.random() * 4));
      
      history.push({
        raStartDate: startDate.toISOString().split('T')[0],
        raEndDate: endDate.toISOString().split('T')[0],
        raRemovalReason: raRemovalReasons[Math.floor(Math.random() * raRemovalReasons.length)]
      });
    }
  }
  
  return history;
};

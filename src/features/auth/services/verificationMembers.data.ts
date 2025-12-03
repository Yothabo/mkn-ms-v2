import { ExtendedMember } from '../../../data/mock/interfaces';

// Comprehensive embedded members covering ALL scenarios
export const embeddedMembers: ExtendedMember[] = [
  // 1. ACTIVE MEMBER - Regular active member
  {
    id: 'harare-001',
    name: 'Sipho',
    surname: 'Ndlovu',
    gender: 'male',
    dateOfBirth: '1985-06-15',
    phone: '+263771234567',
    email: 'sipho.ndlovu@mkn.org',
    dateOfEntry: '2020-03-10',
    reasonOfEntry: 'Spiritual attacks and nightmares',
    nextOfKin: {
      name: 'Nomvula',
      surname: 'Ndlovu',
      relationship: 'spouse',
      phone: '+263778765432',
      address: '123 Main Street, Harare'
    },
    address: '123 Main Street, Harare',
    raCount: 0,
    raLock: false,
    status: 'active',
    position: 'facilitator',
    purity: 'none',
    mainBranch: 'harare',
    lastAttendance: new Date().toISOString().split('T')[0],
    isYouth: false,
    isFemale: false,
    cardNumber: 1001,
    raHistory: []
  },

  // 2. NEW MEMBER - Has receipt number, no card yet
  {
    id: 'bulawayo-002',
    name: 'Thandeka',
    surname: 'Khumalo',
    gender: 'female',
    dateOfBirth: '1998-12-03',
    phone: '+263772345678',
    email: 'thandeka.khumalo@mkn.org',
    dateOfEntry: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    reasonOfEntry: 'Seeking protection from ancestral spirits',
    nextOfKin: {
      name: 'Bongani',
      surname: 'Khumalo',
      relationship: 'parent',
      phone: '+263779876543',
      address: '456 High Street, Bulawayo'
    },
    address: '456 High Street, Bulawayo',
    raCount: 0,
    raLock: false,
    status: 'active',
    position: 'member',
    purity: 'virgin',
    mainBranch: 'bulawayo',
    lastAttendance: new Date().toISOString().split('T')[0],
    isYouth: true,
    isFemale: true,
    receiptNumber: 'RCPT20241001',
    raHistory: []
  },

  // 3. PRE-RA MEMBER - 60+ days absent
  {
    id: 'gaborone-003',
    name: 'Bongani',
    surname: 'Moyo',
    gender: 'male',
    dateOfBirth: '1978-09-22',
    phone: '+263773456789',
    email: 'bongani.moyo@mkn.org',
    dateOfEntry: '2019-07-15',
    reasonOfEntry: 'Could not sleep at night, troubled by spirits',
    nextOfKin: {
      name: 'Sibongile',
      surname: 'Moyo',
      relationship: 'spouse',
      phone: '+263770123456',
      address: '789 Church Road, Gaborone'
    },
    address: '789 Church Road, Gaborone',
    raCount: 0,
    raLock: false,
    status: 'preRa',
    position: 'steward',
    purity: 'inapplicable',
    mainBranch: 'gaborone',
    lastAttendance: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 75 days ago
    isYouth: false,
    isFemale: false,
    cardNumber: 1003,
    raHistory: [
      {
        raStartDate: '2022-03-15',
        raEndDate: '2022-06-20',
        raRemovalReason: 'Was outside the country'
      }
    ]
  },

  // 4. RA MEMBER - 90+ days absent
  {
    id: 'johannesburg-004',
    name: 'Nompumelelo',
    surname: 'Dube',
    gender: 'female',
    dateOfBirth: '1992-04-18',
    phone: '+263774567890',
    email: 'nompumelelo.dube@mkn.org',
    dateOfEntry: '2021-01-20',
    reasonOfEntry: 'Dreams guiding me to this path',
    nextOfKin: {
      name: 'Mandla',
      surname: 'Dube',
      relationship: 'sibling',
      phone: '+263771234567',
      address: '321 Hope Street, Johannesburg'
    },
    address: '321 Hope Street, Johannesburg',
    raCount: 1,
    raLock: false,
    status: 'ra',
    position: 'songster',
    purity: 'none',
    mainBranch: 'johannesburg',
    lastAttendance: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 120 days ago
    isYouth: true,
    isFemale: true,
    cardNumber: 1004,
    raHistory: [
      {
        raStartDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        raEndDate: undefined,
        raRemovalReason: undefined
      }
    ]
  },

  // 5. INACTIVE MEMBER - Permanently removed
  {
    id: 'pretoria-005',
    name: 'Jabulani',
    surname: 'Mpofu',
    gender: 'male',
    dateOfBirth: '1980-11-30',
    phone: '+263775678901',
    email: 'jabulani.mpofu@mkn.org',
    dateOfEntry: '2018-05-12',
    reasonOfEntry: 'Family spiritual heritage',
    nextOfKin: {
      name: 'Nokuthula',
      surname: 'Mpofu',
      relationship: 'spouse',
      phone: '+263772345678',
      address: '654 Faith Avenue, Pretoria'
    },
    address: '654 Faith Avenue, Pretoria',
    raCount: 3,
    raLock: true,
    status: 'inactive',
    position: 'member',
    purity: 'inapplicable',
    mainBranch: 'pretoria',
    lastAttendance: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 400 days ago
    isYouth: false,
    isFemale: false,
    cardNumber: 1005,
    raHistory: [
      {
        raStartDate: '2020-01-10',
        raEndDate: '2020-04-15',
        raRemovalReason: 'Had lost faith'
      },
      {
        raStartDate: '2021-06-20',
        raEndDate: '2021-09-25',
        raRemovalReason: 'Was dealing with personal challenges'
      },
      {
        raStartDate: '2022-11-05',
        raEndDate: '2023-02-10',
        raRemovalReason: 'Had work commitments'
      }
    ]
  },

  // 6. DECEASED MEMBER
  {
    id: 'harare-006',
    name: 'Nkosinathi',
    surname: 'Sibanda',
    gender: 'male',
    dateOfBirth: '1975-08-14',
    phone: '+263776789012',
    email: 'nkosinathi.sibanda@mkn.org',
    dateOfEntry: '2017-09-08',
    reasonOfEntry: 'Seeking peace from restless spirits',
    nextOfKin: {
      name: 'Samukelisiwe',
      surname: 'Sibanda',
      relationship: 'spouse',
      phone: '+263773456789',
      address: '987 Memory Lane, Harare'
    },
    address: '987 Memory Lane, Harare',
    raCount: 0,
    raLock: false,
    status: 'deceased',
    position: 'conciliator',
    purity: 'inapplicable',
    mainBranch: 'harare',
    lastAttendance: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 60 days ago
    isYouth: false,
    isFemale: false,
    cardNumber: 1006,
    deceasedInfo: {
      dateOfDeath: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      causeOfDeath: 'Natural causes',
      burialPlace: 'Harare Memorial Gardens'
    },
    raHistory: []
  },

  // 7. ADMIN USER - Evangelist position
  {
    id: 'bulawayo-admin',
    name: 'Admin',
    surname: 'User',
    gender: 'male',
    dateOfBirth: '1982-03-25',
    phone: '+263777890123',
    email: 'admin@mkn.org',
    dateOfEntry: '2016-02-14',
    reasonOfEntry: 'Guidance from the spiritual realm',
    nextOfKin: {
      name: 'Test',
      surname: 'User',
      relationship: 'spouse',
      phone: '+263774567890',
      address: '111 Admin Street, Bulawayo'
    },
    address: '111 Admin Street, Bulawayo',
    raCount: 0,
    raLock: false,
    status: 'active',
    position: 'evangelist',
    purity: 'inapplicable',
    mainBranch: 'bulawayo',
    lastAttendance: new Date().toISOString().split('T')[0],
    isYouth: false,
    isFemale: false,
    cardNumber: 1111,
    raHistory: []
  },

  // 8. TECH USER - Technical personnel
  {
    id: 'tech-001',
    name: 'Tech',
    surname: 'Support',
    gender: 'male',
    dateOfBirth: '1988-07-12',
    phone: '+263778888888',
    email: 'tech@mkn.org',
    dateOfEntry: '2018-11-20',
    reasonOfEntry: 'System technical support',
    nextOfKin: {
      name: 'System',
      surname: 'Operator',
      relationship: 'colleague',
      phone: '+263779999999',
      address: 'Tech Operations Center'
    },
    address: 'Tech Operations Center',
    raCount: 0,
    raLock: false,
    status: 'active',
    position: 'messenger', // Position that grants tech role
    purity: 'inapplicable',
    mainBranch: 'system',
    lastAttendance: new Date().toISOString().split('T')[0],
    isYouth: false,
    isFemale: false,
    cardNumber: 8888,
    raHistory: []
  },

  // 9. FOUNDER - Minimal data, special role
  {
    id: 'founder-001',
    name: 'Founder',
    surname: 'MKN',
    gender: 'male',
    dateOfBirth: '1970-01-01',
    phone: '+263999000000',
    email: 'founder@mkn.org',
    dateOfEntry: '2010-01-01',
    reasonOfEntry: 'System founder',
    nextOfKin: {
      name: 'System',
      surname: 'Admin',
      relationship: 'other',
      phone: '+263999000001',
      address: 'System Headquarters'
    },
    address: 'System Headquarters',
    raCount: 0,
    raLock: false,
    status: 'active',
    position: 'founder',
    purity: 'inapplicable',
    mainBranch: 'system',
    lastAttendance: new Date().toISOString().split('T')[0],
    isYouth: false,
    isFemale: false,
    cardNumber: 9999,
    raHistory: []
  }
];

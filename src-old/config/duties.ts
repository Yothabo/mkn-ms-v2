// Duty definitions and position requirements
export interface Duty {
  id: string;
  englishName: string;
  zuluName: string;
  description: string;
  allowedPositions: string[];
  specialRequirements?: {
    day?: string;
    requirements?: string[];
    restrictions?: string[];
  };
  trainingRequired: boolean;
}

export const duties: Duty[] = [
  {
    id: 'chair',
    englishName: 'Chair',
    zuluName: 'Umgcini sihlalo',
    description: 'Leads the service and ensures proper flow of proceedings',
    allowedPositions: ['facilitator', 'evangelist', 'messenger', 'member', 'songster', 'conciliator', 'clerk'],
    specialRequirements: {
      day: 'wednesday',
      requirements: ['Youth member', 'purity: virgin']
    },
    trainingRequired: true
  },
  {
    id: 'reader',
    englishName: 'Reader',
    zuluName: 'Umfundi wenhloko zendima',
    description: 'Reads the main scriptures and teachings for the service',
    allowedPositions: ['facilitator', 'evangelist', 'messenger', 'member', 'songster', 'conciliator', 'clerk'],
    trainingRequired: false
  },
  {
    id: 'word_reader',
    englishName: 'Word Reader',
    zuluName: 'Obala imfundiso',
    description: 'Explains and elaborates on the teachings and scriptures',
    allowedPositions: ['facilitator', 'evangelist', 'messenger', 'member', 'songster', 'conciliator', 'clerk'],
    trainingRequired: true
  },
  {
    id: 'messenger',
    englishName: 'Messenger',
    zuluName: 'Izithunywa',
    description: 'Delivers messages and assists with service coordination',
    allowedPositions: ['messenger'],
    trainingRequired: false
  },
  {
    id: 'evangelist',
    englishName: 'Evangelist',
    zuluName: 'Umvangeli',
    description: 'Leads evangelism and spiritual guidance during service',
    allowedPositions: ['evangelist'],
    trainingRequired: true
  },
  {
    id: 'announcements',
    englishName: 'Announcements',
    zuluName: 'Izaziso',
    description: 'Makes important announcements to the congregation',
    allowedPositions: ['evangelist'],
    trainingRequired: false
  },
  {
    id: 'inside_facilitator',
    englishName: 'Inside Facilitator',
    zuluName: 'Umkhokheli phakathi',
    description: 'Manages proceedings inside the service venue',
    allowedPositions: ['facilitator'],
    specialRequirements: {
      requirements: ['Female facilitators have priority']
    },
    trainingRequired: true
  },
  {
    id: 'outside_facilitator',
    englishName: 'Outside Facilitator',
    zuluName: 'Umkhokheli phandle',
    description: 'Manages proceedings outside the service venue',
    allowedPositions: ['facilitator'],
    trainingRequired: true
  }
];

// Available positions in the church - MUST MATCH MEMBERS CONFIG
export const positions = [
  'facilitator',
  'evangelist',
  'messenger',
  'member',
  'songster',
  'steward',
  'conciliator',
  'clerk'
] as const;

export type Position = typeof positions[number];

// Helper functions
export const getDutyById = (id: string): Duty | undefined => {
  return duties.find(duty => duty.id === id);
};

export const getDutiesByServiceType = (serviceType: 'full' | 'short'): Duty[] => {
  return duties.filter(duty => {
    if (serviceType === 'short') {
      return ['chair', 'messenger', 'announcements', 'inside_facilitator', 'outside_facilitator'].includes(duty.id);
    }
    return true;
  });
};

export const canMemberPerformDuty = (memberPosition: Position, dutyId: string, day?: string, memberPurity?: string, isYouth?: boolean): boolean => {
  const duty = getDutyById(dutyId);
  if (!duty) return false;

  // Check if member's position is allowed for this duty
  if (!duty.allowedPositions.includes(memberPosition)) {
    return false;
  }

  // Check Wednesday Chair special requirements
  if (day === 'wednesday' && dutyId === 'chair') {
    return isYouth === true && memberPurity === 'virgin';
  }

  // Check Thursday Chair restrictions (no youth)
  if (day === 'thursday' && dutyId === 'chair') {
    return isYouth !== true;
  }

  return true;
};

export const getEligibleMembersForDuty = (dutyId: string, members: Array<{
  id: string, 
  position: Position, 
  isYouth?: boolean, 
  purity?: string,
  isFemale?: boolean
}>, day?: string) => {
  const duty = getDutyById(dutyId);
  if (!duty) return [];

  return members.filter(member => {
    // Check position eligibility
    if (!duty.allowedPositions.includes(member.position)) {
      return false;
    }

    // Wednesday Chair duty requires youth with virgin purity
    if (day === 'wednesday' && dutyId === 'chair') {
      return member.isYouth && member.purity === 'virgin';
    }

    // Thursday Chair duty excludes youth
    if (day === 'thursday' && dutyId === 'chair') {
      return !member.isYouth;
    }

    // For facilitator duties, prioritize females
    if ((dutyId === 'inside_facilitator' || dutyId === 'outside_facilitator') && member.isFemale) {
      return true;
    }

    return true;
  });
};

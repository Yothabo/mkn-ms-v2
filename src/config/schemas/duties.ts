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

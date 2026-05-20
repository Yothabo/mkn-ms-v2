export type ScreenName =
  | 'entry'
  | 'intro'
  | 'journey'
  | 'guidelines'
  | 'conduct'
  | 'feedback';

export interface ScreenConfig {
  name: ScreenName;
  title: string;
  backgroundColor: string;
  textColor: string;
  dotColor: string;
  order: number;
  hasModal?: boolean;
  modalTitle?: string;
  // Add missing properties
  id?: number;
  number?: string;
  bgColor?: string;
  hasPattern?: boolean;
  patternColor?: string;
}

export const SCREEN_CONFIGS: Record<ScreenName, ScreenConfig> = {
  entry: {
    name: 'entry',
    title: 'MKN Media',
    backgroundColor: 'var(--color-dark-green)',
    textColor: 'var(--color-cream)',
    dotColor: 'var(--color-orange)',
    order: 0,
    id: 0,
    number: '00',
    bgColor: 'var(--color-dark-green)',
    hasPattern: true,
    patternColor: 'var(--color-orange)'
  },
  intro: {
    name: 'intro',
    title: '37th Anniversary',
    backgroundColor: 'var(--color-cream)', // CHANGED: cream background
    textColor: 'var(--color-dark-green)', // CHANGED: dark-green text
    dotColor: 'var(--color-orange)',
    order: 1,
    id: 1,
    number: '01',
    bgColor: 'var(--color-cream)', // CHANGED: cream background
    hasPattern: true,
    patternColor: 'var(--color-orange)'
  },
  journey: {
    name: 'journey',
    title: 'The Journey',
    backgroundColor: 'var(--color-dark-green)',
    textColor: 'var(--color-cream)',
    dotColor: 'var(--color-orange)',
    order: 2,
    hasModal: true,
    modalTitle: 'The Journey of the Host',
    id: 2,
    number: '02',
    bgColor: 'var(--color-dark-green)',
    hasPattern: true,
    patternColor: 'var(--color-orange)'
  },
  guidelines: {
    name: 'guidelines',
    title: 'Guidelines',
    backgroundColor: 'var(--color-orange)',
    textColor: 'var(--color-cream)',
    dotColor: 'var(--color-dark-green)',
    order: 3,
    hasModal: true,
    modalTitle: 'Event Activities & Guidelines',
    id: 3,
    number: '03',
    bgColor: 'var(--color-orange)',
    hasPattern: true,
    patternColor: 'var(--color-dark-green)'
  },
  conduct: {
    name: 'conduct',
    title: 'Code of Conduct',
    backgroundColor: 'var(--color-dark-green)',
    textColor: 'var(--color-cream)',
    dotColor: 'var(--color-cream)',
    order: 4,
    hasModal: true,
    modalTitle: 'Code of Conduct',
    id: 4,
    number: '04',
    bgColor: 'var(--color-dark-green)',
    hasPattern: true,
    patternColor: 'var(--color-cream)'
  },
  feedback: {
    name: 'feedback',
    title: 'Feedback',
    backgroundColor: 'var(--color-orange)',
    textColor: 'var(--color-cream)',
    dotColor: 'var(--color-dark-green)',
    order: 5,
    hasModal: true,
    modalTitle: 'Share Your Feedback',
    id: 5,
    number: '05',
    bgColor: 'var(--color-orange)',
    hasPattern: true,
    patternColor: 'var(--color-dark-green)'
  }
};

export const SCREEN_ORDER: ScreenName[] = [
  'entry', 'intro', 'journey', 'guidelines', 'conduct', 'feedback'
];

export const SCREEN_INDEXES: Record<ScreenName, number> = {
  entry: 0,
  intro: 1,
  journey: 2,
  guidelines: 3,
  conduct: 4,
  feedback: 5
};

export interface ScreenTransition {
  from: ScreenName;
  to: ScreenName;
  direction: 'up' | 'down';
}

export interface ScreenDimensions {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

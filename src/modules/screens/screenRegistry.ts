import { ScreenName, SCREEN_CONFIGS } from '../../types/screens';
import EntryScreen from './entry/EntryScreen';
import IntroScreen from './intro/IntroScreen';
import JourneyScreen from './journey/JourneyScreen';
import GuidelinesScreen from './guidelines/GuidelinesScreen';
import ConductScreen from './conduct/ConductScreen';
import FeedbackScreen from './feedback/FeedbackScreen';

export interface ScreenComponentProps {
  isActive?: boolean;
  transitionDirection?: 'next' | 'prev' | null;
  onNavigate?: (direction: 'next' | 'prev') => void;
  onGetStarted?: () => void;
}

export interface ScreenRegistration {
  name: ScreenName;
  component: React.ComponentType<ScreenComponentProps>;
  config: typeof SCREEN_CONFIGS[ScreenName];
  order: number;
}

const screenRegistry: ScreenRegistration[] = [
  {
    name: 'entry',
    component: EntryScreen,
    config: SCREEN_CONFIGS.entry,
    order: 0
  },
  {
    name: 'intro',
    component: IntroScreen,
    config: SCREEN_CONFIGS.intro,
    order: 1
  },
  {
    name: 'journey',
    component: JourneyScreen,
    config: SCREEN_CONFIGS.journey,
    order: 2
  },
  {
    name: 'guidelines',
    component: GuidelinesScreen,
    config: SCREEN_CONFIGS.guidelines,
    order: 3
  },
  {
    name: 'conduct',
    component: ConductScreen,
    config: SCREEN_CONFIGS.conduct,
    order: 4
  },
  {
    name: 'feedback',
    component: FeedbackScreen,
    config: SCREEN_CONFIGS.feedback,
    order: 5
  }
];

export const getScreenByName = (name: ScreenName): ScreenRegistration | undefined => {
  return screenRegistry.find(screen => screen.name === name);
};

export const getScreenByOrder = (order: number): ScreenRegistration | undefined => {
  return screenRegistry.find(screen => screen.order === order);
};

export const getNextScreen = (currentName: ScreenName): ScreenRegistration | null => {
  const current = getScreenByName(currentName);
  if (!current) return null;

  const nextOrder = current.order + 1;
  return getScreenByOrder(nextOrder) || null;
};

export const getPreviousScreen = (currentName: ScreenName): ScreenRegistration | null => {
  const current = getScreenByName(currentName);
  if (!current) return null;

  const prevOrder = current.order - 1;
  return getScreenByOrder(prevOrder) || null;
};

export const getTotalScreens = (): number => {
  return screenRegistry.length;
};

export const getScreenIndex = (screenName: ScreenName): number => {
  return screenRegistry.findIndex(screen => screen.name === screenName);
};

export const isValidScreenName = (name: string): name is ScreenName => {
  return screenRegistry.some(screen => screen.name === name);
};

export const getScreensInOrder = (): ScreenRegistration[] => {
  return [...screenRegistry].sort((a, b) => a.order - b.order);
};

export const getFirstScreen = (): ScreenRegistration => {
  return screenRegistry[0];
};

export const getLastScreen = (): ScreenRegistration => {
  return screenRegistry[screenRegistry.length - 1];
};

export default screenRegistry;

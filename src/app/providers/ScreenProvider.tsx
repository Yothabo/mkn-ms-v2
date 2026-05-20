import React, { createContext, useState, useCallback, ReactNode, useMemo, useRef } from 'react';

export type ScreenName = 'entry' | 'intro' | 'journey' | 'guidelines' | 'conduct' | 'feedback';

interface ScreenContextType {
  currentScreen: ScreenName;
  previousScreen: ScreenName | null;
  isTransitioning: boolean;
  transitionDirection: 'next' | 'prev' | null;
  goToScreen: (screen: ScreenName) => void;
  goToNextScreen: () => void;
  goToPrevScreen: () => void;
}

const ScreenContext = createContext<ScreenContextType | undefined>(undefined);
export { ScreenContext };

const screenOrder: ScreenName[] = ['entry', 'intro', 'journey', 'guidelines', 'conduct', 'feedback'];

interface ScreenProviderProps {
  children: ReactNode;
}

export const ScreenProvider: React.FC<ScreenProviderProps> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('entry');
  const [previousScreen, setPreviousScreen] = useState<ScreenName | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev' | null>(null);
  
  // PERFORMANCE: Use ref for timeouts
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  const goToScreen = useCallback((screen: ScreenName) => {
    if (screen === currentScreen) return;

    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    setIsTransitioning(true);
    setPreviousScreen(currentScreen);

    const currentIndex = screenOrder.indexOf(currentScreen);
    const newIndex = screenOrder.indexOf(screen);
    const direction = newIndex > currentIndex ? 'next' : 'prev';
    setTransitionDirection(direction);

    // Set new screen immediately
    setCurrentScreen(screen);

    // OPTIMIZED: Shorter timeout for smoother transitions
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setTransitionDirection(null);
    }, 580); // Slightly shorter than CSS animation (600ms)
  }, [currentScreen]);

  const goToNextScreen = useCallback(() => {
    const currentIndex = screenOrder.indexOf(currentScreen);
    if (currentIndex < screenOrder.length - 1) {
      goToScreen(screenOrder[currentIndex + 1]);
    }
  }, [currentScreen, goToScreen]);

  const goToPrevScreen = useCallback(() => {
    const currentIndex = screenOrder.indexOf(currentScreen);
    if (currentIndex > 0) {
      goToScreen(screenOrder[currentIndex - 1]);
    }
  }, [currentScreen, goToScreen]);

  // PERFORMANCE: Memoize context value
  const contextValue = useMemo(() => ({
    currentScreen,
    previousScreen,
    isTransitioning,
    transitionDirection,
    goToScreen,
    goToNextScreen,
    goToPrevScreen,
  }), [currentScreen, previousScreen, isTransitioning, transitionDirection, goToScreen, goToNextScreen, goToPrevScreen]);

  return (
    <ScreenContext.Provider value={contextValue}>
      {children}
    </ScreenContext.Provider>
  );
};

export default ScreenProvider;

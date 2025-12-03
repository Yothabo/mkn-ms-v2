import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { usePagePersistence } from './usePagePersistence';

export function useScrollPersistence(layoutKey: string) {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const { pageState, saveScrollPosition, restoreScrollPosition } = usePagePersistence(layoutKey);

  // Setup scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        saveScrollPosition(mainRef.current.scrollTop);
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, [saveScrollPosition]);

  // Restore scroll position when location changes
  useEffect(() => {
    if (mainRef.current) {
      restoreScrollPosition(mainRef.current);
    }
  }, [location.pathname, restoreScrollPosition]);

  return { mainRef, scrollPosition: pageState.scrollPosition };
}

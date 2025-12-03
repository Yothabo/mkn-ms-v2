import { useState, useEffect, useRef, useCallback } from 'react';

interface PageState {
  scrollPosition: number;
  filters: {
    search: string;
    status: string | undefined;
  };
}

export const usePagePersistence = (pageKey: string) => {
  const [pageState, setPageState] = useState<PageState>(() => {
    const saved = localStorage.getItem(`mkn-page-${pageKey}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.warn(`Failed to parse saved state for ${pageKey}:`, error);
      }
    }
    return {
      scrollPosition: 0,
      filters: {
        search: '',
        status: undefined
      }
    };
  });

  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveScrollPosition = useCallback((position: number) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const newState = { ...pageState, scrollPosition: position };
      localStorage.setItem(`mkn-page-${pageKey}`, JSON.stringify(newState));
      setPageState(newState);
    }, 100);
  }, [pageState, pageKey]);

  const saveFilters = useCallback((filters: { search: string; status: string | undefined }) => {
    const newState = { ...pageState, filters };
    localStorage.setItem(`mkn-page-${pageKey}`, JSON.stringify(newState));
    setPageState(newState);
  }, [pageState, pageKey]);

  const restoreScrollPosition = useCallback((element: HTMLElement) => {
    if (pageState.scrollPosition > 0) {
      element.scrollTop = pageState.scrollPosition;
    }
  }, [pageState.scrollPosition]);

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    pageState,
    saveScrollPosition,
    saveFilters,
    restoreScrollPosition,
    mainRef
  };
};

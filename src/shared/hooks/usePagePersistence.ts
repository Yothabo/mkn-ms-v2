import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export interface PageState {
  scrollPosition: number;
  filters: Record<string, any>;
  formData: Record<string, any>;
  timestamp: number;
}

export function usePagePersistence(pageKey: string) {
  const location = useLocation();
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Generate a unique key for this specific page instance
  const storageKey = `mkn-page-${pageKey}-${location.pathname}`;

  const [pageState, setPageState] = useState<PageState>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {
        scrollPosition: 0,
        filters: {},
        formData: {},
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error loading page state:', error);
      return {
        scrollPosition: 0,
        filters: {},
        formData: {},
        timestamp: Date.now()
      };
    }
  });

  // Save page state to localStorage
  const savePageState = useCallback((updates: Partial<PageState>) => {
    setPageState(prev => {
      const newState = {
        ...prev,
        ...updates,
        timestamp: Date.now()
      };
      
      try {
        localStorage.setItem(storageKey, JSON.stringify(newState));
      } catch (error) {
        console.error('Error saving page state:', error);
      }
      
      return newState;
    });
  }, [storageKey]);

  // Save scroll position (debounced)
  const saveScrollPosition = useCallback((position: number) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      savePageState({ scrollPosition: position });
    }, 200); // Debounce scroll saves
  }, [savePageState]);

  // Save filters
  const saveFilters = useCallback((filters: Record<string, any>) => {
    savePageState({ filters });
  }, [savePageState]);

  // Save form data
  const saveFormData = useCallback((formData: Record<string, any>) => {
    savePageState({ formData });
  }, [savePageState]);

  // Restore scroll position
  const restoreScrollPosition = useCallback((element?: HTMLElement | null) => {
    if (pageState.scrollPosition > 0) {
      const targetElement = element || document.documentElement;
      setTimeout(() => {
        targetElement.scrollTop = pageState.scrollPosition;
      }, 50);
    }
  }, [pageState.scrollPosition]);

  // Clear page state (useful when explicitly navigating away)
  const clearPageState = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      setPageState({
        scrollPosition: 0,
        filters: {},
        formData: {},
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error clearing page state:', error);
    }
  }, [storageKey]);

  // Clean up timeout on unmount
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
    saveFormData,
    restoreScrollPosition,
    clearPageState
  };
}

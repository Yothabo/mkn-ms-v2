import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageState<T>(pageKey: string, initialState: T) {
  const location = useLocation();
  const [state, setState] = useState<T>(() => {
    try {
      const savedStates = localStorage.getItem('mkn-page-states');
      if (savedStates) {
        const allStates = JSON.parse(savedStates);
        const pageState = allStates[pageKey];
        return pageState || initialState;
      }
    } catch (error) {
      console.error('Error loading page state:', error);
    }
    return initialState;
  });

  const setPageState = useCallback((newState: T | ((prev: T) => T)) => {
    setState(prev => {
      const updatedState = typeof newState === 'function' 
        ? (newState as Function)(prev) 
        : newState;
      
      // Save to localStorage
      try {
        const savedStates = localStorage.getItem('mkn-page-states');
        const allStates = savedStates ? JSON.parse(savedStates) : {};
        allStates[pageKey] = updatedState;
        localStorage.setItem('mkn-page-states', JSON.stringify(allStates));
      } catch (error) {
        console.error('Error saving page state:', error);
      }
      
      return updatedState;
    });
  }, [pageKey]);

  // Clear state when leaving the page (optional)
  useEffect(() => {
    return () => {
      // You can choose to clear or keep the state when leaving
      // For now, we'll keep it persisted
    };
  }, [pageKey]);

  return [state, setPageState] as const;
}

import { useState, useEffect, useCallback } from 'react';

export interface PersistedViewState {
  mode: 'admin' | 'member';
  currentView: string;
  pageState: Record<string, any>;
  scrollPosition?: number;
  timestamp: number;
}

export function useIntelligentPersistence() {
  const [viewStates, setViewStates] = useState<Record<string, PersistedViewState>>(() => {
    try {
      const savedStates = localStorage.getItem('mkn-view-states');
      return savedStates ? JSON.parse(savedStates) : {};
    } catch (error) {
      console.error('Error loading persisted view states:', error);
      return {};
    }
  });

  // Save states to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('mkn-view-states', JSON.stringify(viewStates));
    } catch (error) {
      console.error('Error saving persisted view states:', error);
    }
  }, [viewStates]);

  const saveViewState = useCallback((mode: 'admin' | 'member', currentView: string, pageState: Record<string, any> = {}, scrollPosition?: number) => {
    setViewStates(prev => ({
      ...prev,
      [mode]: {
        mode,
        currentView,
        pageState,
        scrollPosition,
        timestamp: Date.now()
      }
    }));
  }, []);

  const getViewState = useCallback((mode: 'admin' | 'member') => {
    return viewStates[mode];
  }, [viewStates]);

  const clearViewState = useCallback((mode: 'admin' | 'member') => {
    setViewStates(prev => {
      const newStates = { ...prev };
      delete newStates[mode];
      return newStates;
    });
  }, []);

  return {
    viewStates,
    saveViewState,
    getViewState,
    clearViewState
  };
}

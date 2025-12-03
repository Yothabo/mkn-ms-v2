import { useState, useEffect } from 'react';

export function usePersistedState<T>(key: string, defaultValue: T) {
  // Synchronously read from localStorage on initial render
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(`mkn-${key}`);
      if (item) {
        return JSON.parse(item);
      }
      return defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  // Persist to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(`mkn-${key}`, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error saving localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState] as const;
}

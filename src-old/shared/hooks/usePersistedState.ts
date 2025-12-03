import { useState, useEffect } from 'react';

export function usePersistedState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(`mkn-${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading persisted state for ${key}:`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`mkn-${key}`, JSON.stringify(state));
    } catch (error) {
      console.error(`Error saving persisted state for ${key}:`, error);
    }
  }, [key, state]);

  return [state, setState] as const;
}

import React, { createContext, useContext, useEffect, useState } from 'react';

interface CacheContextType {
  isCached: boolean;
  cacheData: <T>(key: string, data: T) => Promise<void>;
  getCachedData: <T>(key: string) => Promise<T | null>;
  clearCache: () => Promise<void>;
}

const CacheContext = createContext<CacheContextType | undefined>(undefined);

export const useCache = (): CacheContextType => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};

interface CacheProviderProps {
  children: React.ReactNode;
}

const CACHE_KEY = 'mkn-poster-cache';

const CacheProvider: React.FC<CacheProviderProps> = ({ children }) => {
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    // Check if app has been loaded before
    const cached = localStorage.getItem(CACHE_KEY);
    setIsCached(!!cached);

    // Mark as cached on first load
    if (!cached) {
      localStorage.setItem(CACHE_KEY, 'true');
    }
  }, []);

  const cacheData = async <T,>(key: string, data: T): Promise<void> => {
    try {
      const cacheKey = `${CACHE_KEY}-${key}`;
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  };

  const getCachedData = async <T,>(key: string): Promise<T | null> => {
    try {
      const cacheKey = `${CACHE_KEY}-${key}`;
      const data = localStorage.getItem(cacheKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn('Failed to get cached data:', error);
      return null;
    }
  };

  const clearCache = async (): Promise<void> => {
    try {
      // Clear all cache entries starting with CACHE_KEY
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(CACHE_KEY)) {
          localStorage.removeItem(key);
        }
      });
      setIsCached(false);
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  };

  const value = {
    isCached,
    cacheData,
    getCachedData,
    clearCache,
  };

  return (
    <CacheContext.Provider value={value}>
      {children}
    </CacheContext.Provider>
  );
};

export default CacheProvider;

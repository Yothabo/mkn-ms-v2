import React, { createContext, useContext, useState, useCallback } from 'react';

interface LoadingState {
  isSwitchingView: boolean;
  isSwitchingMode: boolean;
  cachedViews: Map<string, React.ReactNode>;
}

interface LoadingContextType {
  loadingState: LoadingState;
  startLoading: (type: 'view' | 'mode') => void;
  stopLoading: (type: 'view' | 'mode') => void;
  cacheView: (key: string, component: React.ReactNode) => void;
  getCachedView: (key: string) => React.ReactNode | null;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isSwitchingView: false,
    isSwitchingMode: false,
    cachedViews: new Map(),
  });

  const startLoading = useCallback((type: 'view' | 'mode') => {
    setLoadingState(prev => ({
      ...prev,
      isSwitchingView: type === 'view',
      isSwitchingMode: type === 'mode',
    }));
  }, []);

  const stopLoading = useCallback((type: 'view' | 'mode') => {
    setLoadingState(prev => ({
      ...prev,
      isSwitchingView: type === 'view' ? false : prev.isSwitchingView,
      isSwitchingMode: type === 'mode' ? false : prev.isSwitchingMode,
    }));
  }, []);

  const cacheView = useCallback((key: string, component: React.ReactNode) => {
    setLoadingState(prev => {
      const newCachedViews = new Map(prev.cachedViews);
      newCachedViews.set(key, component);
      return { ...prev, cachedViews: newCachedViews };
    });
  }, []);

  const getCachedView = useCallback((key: string) => {
    return loadingState.cachedViews.get(key) || null;
  }, [loadingState.cachedViews]);

  return (
    <LoadingContext.Provider value={{
      loadingState,
      startLoading,
      stopLoading,
      cacheView,
      getCachedView,
    }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

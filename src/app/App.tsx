import React from 'react';
import Landing from '../pages/public/Landing';
import ErrorBoundary from '../shared/components/ErrorBoundary/ErrorBoundary';
import { ScreenProvider } from './providers/ScreenProvider';
import '../styles/globals.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ScreenProvider>
        <Landing />
      </ScreenProvider>
    </ErrorBoundary>
  );
};

export default App;

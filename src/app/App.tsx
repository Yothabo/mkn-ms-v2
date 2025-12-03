import React from 'react';
import { AuthProvider } from '../shared/context/AuthContext';
import { LoadingProvider } from '../shared/context/LoadingContext';
import { ThemeProvider } from '../shared/context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import '../core/styles/globals.css';
import '../core/styles/themes.css';
import '../features/auth/styles/base.css';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
          <div className="app">
            <AppRoutes />
          </div>
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

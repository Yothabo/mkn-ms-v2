import { AuthProvider } from './shared/context/AuthContext';
import { LoadingProvider } from './shared/context/LoadingContext';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';
import './styles/themes.css';
import { useEffect } from 'react';

export default function App() {
  // Initialize theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('mkn-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Use saved theme, or system preference, or default to light
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <AuthProvider>
      <LoadingProvider>
        <div className="app">
          <AppRoutes />
        </div>
      </LoadingProvider>
    </AuthProvider>
  );
}

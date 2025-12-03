import { AuthProvider } from '../../shared/context/AuthContext';
import { LoadingProvider } from '../../shared/context/LoadingContext';
import { ThemeProvider } from '../../shared/context/ThemeContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

import { useAuth } from '../../../shared/context/AuthContext';
import { BottomNavContent } from './components/BottomNavContent';

interface BottomNavProps {
  currentView: string;
  onViewChange: (view: any) => void;
  userType: 'member' | 'admin' | 'founder' | 'tech';
}

export default function BottomNav({ currentView, onViewChange, userType }: BottomNavProps) {
  const { user } = useAuth();

  return (
    <BottomNavContent
      currentView={currentView}
      userType={userType}
      onViewChange={onViewChange}
    />
  );
}

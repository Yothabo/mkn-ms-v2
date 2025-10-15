import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import BottomNav from './BottomNav';
import MemberRoutes from '../../../routes/MemberRoutes';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';

type MemberView = 'home' | 'announcements' | 'hymns' | 'duties' | 'profile';

export default function MemberLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentView, setCurrentView] = useState<MemberView>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'home';
    setCurrentView((path as MemberView) || 'home');
  }, [location.pathname]);

  const handleViewChange = (view: MemberView) => {
    if (view === currentView || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentView(view);
    navigate(`/member/${view}`);
    
    setTimeout(() => setIsTransitioning(false), 150);
  };

  return (
    <div className="member-layout">
      <AppHeader userType="member" />

      <main className={`member-main ${isTransitioning ? 'transitioning' : ''}`}>
        <MemberRoutes />
      </main>

      <BottomNav
        currentView={currentView}
        onViewChange={handleViewChange}
        userType="member"
      />

      <style>{`
        .member-layout {
          min-height: 100vh;
          background: var(--color-background);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .member-main {
          flex: 1;
          padding: 0 0 2rem 0;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          opacity: 1;
          transition: opacity 0.1s ease;
        }

        .member-main.transitioning {
          opacity: 0.7;
        }

        .member-main::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 640px) {
          .member-main {
            padding: 0 0 1rem 0;
          }
        }
      `}</style>
    </div>
  );
}

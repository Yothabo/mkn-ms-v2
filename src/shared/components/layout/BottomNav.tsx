import { useAuth } from '../../context/AuthContext';
import {
  Home,
  Campaign,
  LibraryBooks,
  Assignment,
  Person,
  Dashboard,
  People,
  CheckCircle,
  RssFeed,
} from '@mui/icons-material';

interface BottomNavProps {
  currentView: string;
  onViewChange: (view: any) => void;
  userType: 'member' | 'admin';
}

export default function BottomNav({ currentView, onViewChange, userType }: BottomNavProps) {
  const { logout } = useAuth();

  const memberNavItems = [
    { id: 'home', label: 'Home', icon: <Home className="nav-icon" /> },
    { id: 'feed', label: 'Feed', icon: <RssFeed className="nav-icon" /> },
    { id: 'media', label: 'Media', icon: <LibraryBooks className="nav-icon" /> },
    { id: 'duties', label: 'Duties', icon: <Assignment className="nav-icon" /> },
    { id: 'profile', label: 'Profile', icon: <Person className="nav-icon" /> },
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Dashboard className="nav-icon" /> },
    { id: 'members', label: 'Members', icon: <People className="nav-icon" /> },
    { id: 'attendance', label: 'Attendance', icon: <CheckCircle className="nav-icon" /> },
    { id: 'duties', label: 'Duties', icon: <Assignment className="nav-icon" /> },
    { id: 'feed', label: 'Feed', icon: <RssFeed className="nav-icon" /> },
  ];

  const navItems = userType === 'admin' ? adminNavItems : memberNavItems;

  const handleClick = (view: string) => {
    onViewChange(view);
  };

  return (
    <nav className="bottom-nav">
      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => handleClick(item.id)}
            aria-label={item.label}
          >
            {item.icon}
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          max-width: 1200px;
          background: var(--color-surface);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid var(--color-border);
          border-radius: 1.25rem;
          padding: 1.25rem;
          z-index: 999;
          box-sizing: border-box;
          min-height: 5rem;
        }

        .nav-items {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          cursor: pointer;
          min-width: 5rem;
          color: var(--color-text-light);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          flex: 1;
          text-align: center;
          height: 100%;
          min-height: 3.5rem;
          position: relative;
          overflow: hidden;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--color-secondary);
          border-radius: 0.75rem;
          transform: scale(0.95);
          opacity: 0;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        .nav-item:hover {
          color: var(--color-secondary);
        }

        .nav-item:hover::before {
          opacity: 0.08;
          transform: scale(1);
        }

        .nav-item.active {
          color: white;
        }

        .nav-item.active::before {
          opacity: 1;
          transform: scale(1);
        }

        .nav-icon {
          width: 1.5rem;
          height: 1.5rem;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }

        .nav-item.active .nav-icon {
          transform: scale(1.05);
        }

        .nav-label {
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }

        .nav-item.active .nav-label {
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .bottom-nav {
            width: 100vw;
            bottom: 0;
            left: 0;
            right: 0;
            transform: none;
            border-radius: 0;
            border: none;
            border-top: 1px solid var(--color-border);
            padding: 0.75rem 0.5rem 1rem 0.5rem;
            margin: 0;
            max-width: none;
            min-height: 4.5rem;
          }

          .nav-items {
            padding: 0;
            margin: 0;
            gap: 0.25rem;
            height: 100%;
          }

          .nav-item {
            padding: 0.75rem 0.125rem;
            min-width: auto;
            gap: 0.375rem;
            flex: 1;
            max-width: 20%;
            min-height: 3rem;
          }

          .nav-item:hover {
            transform: none;
          }

          .nav-item.active {
            transform: none;
          }

          .nav-icon {
            width: 1.25rem;
            height: 1.25rem;
          }

          .nav-label {
            font-size: 0.7rem;
          }
        }

        @media (max-width: 380px) {
          .bottom-nav {
            padding: 0.625rem 0.375rem 0.75rem 0.375rem;
            min-height: 4rem;
          }

          .nav-items {
            gap: 0.125rem;
          }

          .nav-item {
            padding: 0.5rem 0.0625rem;
            gap: 0.25rem;
            min-height: 2.5rem;
          }

          .nav-label {
            font-size: 0.65rem;
          }

          .nav-icon {
            width: 1.1rem;
            height: 1.1rem;
          }
        }
      `}</style>
    </nav>
  );
}

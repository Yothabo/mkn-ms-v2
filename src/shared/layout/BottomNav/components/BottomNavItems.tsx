import {
  HiHome,
  HiBookOpen,
  HiClipboardList,
  HiUser,
  HiChartBar,
  HiUsers,
  HiCheckCircle,
  HiNewspaper,
  HiCog,
  HiShieldCheck,
  HiServer,
  HiDocumentText,
  HiRefresh,
  HiChip
} from 'react-icons/hi';

interface BottomNavItemsProps {
  currentView: string;
  userType: 'member' | 'admin' | 'founder' | 'tech';
  onViewChange: (view: string) => void;
}

export function BottomNavItems({ currentView, userType, onViewChange }: BottomNavItemsProps) {
  const memberNavItems = [
    { id: 'home', label: 'Home', icon: <HiHome className="nav-icon" /> }, // Clean one-word
    { id: 'feed', label: 'Feed', icon: <HiNewspaper className="nav-icon" /> }, // Already clean
    { id: 'media', label: 'Media', icon: <HiBookOpen className="nav-icon" /> }, // Already clean
    { id: 'duties', label: 'Duties', icon: <HiClipboardList className="nav-icon" /> }, // Clean one-word
    { id: 'profile', label: 'Profile', icon: <HiUser className="nav-icon" /> }, // Clean one-word
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HiServer className="nav-icon" /> }, // Already clean
    { id: 'members', label: 'Members', icon: <HiUsers className="nav-icon" /> }, // Already clean
    { id: 'attendance', label: 'Attendance', icon: <HiCheckCircle className="nav-icon" /> }, // Already clean
    { id: 'duties', label: 'Duties', icon: <HiClipboardList className="nav-icon" /> }, // Clean one-word
    { id: 'feed', label: 'Feed', icon: <HiNewspaper className="nav-icon" /> }, // Already clean
  ];

  const founderNavItems = [
    { id: 'founder-dashboard', label: 'Dashboard', icon: <HiServer className="nav-icon" /> }, // Clean one-word
    { id: 'user-management', label: 'Users', icon: <HiUsers className="nav-icon" /> }, // Clean one-word
    { id: 'system-settings', label: 'Settings', icon: <HiCog className="nav-icon" /> }, // Clean one-word
    { id: 'analytics', label: 'Analytics', icon: <HiChartBar className="nav-icon" /> }, // Already clean
  ];

  const techNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HiServer className="nav-icon" /> }, // Clean one-word
    { id: 'recovery', label: 'Recovery', icon: <HiRefresh className="nav-icon" /> }, // Clean one-word
    { id: 'health', label: 'Health', icon: <HiChartBar className="nav-icon" /> }, // Clean one-word
    { id: 'audit', label: 'Audit', icon: <HiDocumentText className="nav-icon" /> }, // Clean one-word
    { id: 'maintenance', label: 'Tools', icon: <HiChip className="nav-icon" /> }, // Clean one-word
  ];

  const getNavItems = () => {
    switch (userType) {
      case 'founder':
        return founderNavItems;
      case 'admin':
        return adminNavItems;
      case 'tech':
        return techNavItems;
      case 'member':
      default:
        return memberNavItems;
    }
  };

  const navItems = getNavItems();

  return (
    <div className="nav-items">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${currentView === item.id ? 'active' : ''}`}
          onClick={() => onViewChange(item.id)}
          aria-label={item.label}
        >
          {item.icon}
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

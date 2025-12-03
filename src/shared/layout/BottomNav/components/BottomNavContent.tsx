import React from 'react';
import { BottomNavItems } from './BottomNavItems';
import { BottomNavStyles } from './BottomNavStyles';

interface BottomNavContentProps {
  currentView: string;
  userType: 'member' | 'admin' | 'founder' | 'tech';
  onViewChange: (view: any) => void;
}

export const BottomNavContent: React.FC<BottomNavContentProps> = ({
  currentView,
  userType,
  onViewChange
}) => {
  return (
    <>
      <BottomNavStyles />

      <nav className="bottom-nav">
        <div className="bottom-nav-content">
          <BottomNavItems
            currentView={currentView}
            userType={userType}
            onViewChange={onViewChange}
          />
        </div>
      </nav>
    </>
  );
};

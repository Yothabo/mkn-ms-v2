import React from 'react';
import { 
  HiUser, 
  HiCog, 
  HiShieldCheck,
  HiViewGrid,
  HiCollection
} from 'react-icons/hi';

export type IconName = 'user' | 'cog' | 'shield' | 'grid' | 'collection';

export const renderIcon = (iconName: IconName, size: number = 24) => {
  const iconProps = { size };
  
  switch (iconName) {
    case 'user':
      return <HiUser {...iconProps} />;
    case 'cog':
      return <HiCog {...iconProps} />;
    case 'shield':
      return <HiShieldCheck {...iconProps} />;
    case 'grid':
      return <HiViewGrid {...iconProps} />;
    case 'collection':
      return <HiCollection {...iconProps} />;
    default:
      return <HiUser {...iconProps} />;
  }
};

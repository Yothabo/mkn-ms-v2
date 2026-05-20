import React, { ReactNode } from 'react';
import styles from './ContentContainer.module.css';

export interface ContentContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ 
  children, 
  className = '', 
  style = {} 
}) => {
  return (
    <div 
      className={`${styles.contentContainer} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default ContentContainer;

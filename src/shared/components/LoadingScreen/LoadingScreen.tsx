import React from 'react';
import MKNLogo from '../../../assets/MKN.png';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContent}>
        <img 
          src={MKNLogo} 
          alt="Muzi ka Nkulunkulu" 
          className={styles.logo}
        />
        <div className={styles.loadingDots}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
        {message && <p className={styles.loadingMessage}>{message}</p>}
      </div>
    </div>
  );
};

export default LoadingScreen;

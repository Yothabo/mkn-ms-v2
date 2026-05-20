import React, { useEffect, useState } from 'react';
import styles from './LoadingSpinner.module.css';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  minimumDuration?: number; // Minimum duration to show loading in ms
  onFadeComplete?: () => void; // Callback when fade out completes
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  minimumDuration = 3000, // Show for at least 2 seconds
  onFadeComplete
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  
  const sizeMap = {
    small: '60px',
    medium: '90px',
    large: '120px'
  };

  const containerSize = sizeMap[size];

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsFading(true);
      
      // Wait for fade animation to complete (500ms)
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        if (onFadeComplete) onFadeComplete();
      }, 500);
      
      return () => clearTimeout(hideTimer);
    }, minimumDuration);

    return () => clearTimeout(fadeOutTimer);
  }, [minimumDuration, onFadeComplete]);

  if (!isVisible) return null;
  
  return (
    <div
      className={styles.container}
      style={{
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backgroundColor: '#0E4839'
      }}
      role="status"
      aria-label="Loading application"
    >
      {/* Animated spinner circles */}
      <div className={styles.spinner}>
        <div className={styles.innerCircle}></div>
      </div>
      
      {/* MKN Logo with pulse animation */}
      <div className={styles.logoContainer}>
        <img
          src="/MKN.png"
          alt="MKN"
          style={{
            width: containerSize,
            height: containerSize,
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            opacity: 0.9
          }}
          loading="eager"
          decoding="sync"
        />
      </div>
      
      {/* Loading text */}
      <div style={{ 
        marginTop: '20px', 
        color: '#FDFCE7', 
        fontSize: '14px',
        opacity: 0.8,
        animation: 'textFade 2s ease-in-out infinite'
      }}>
        Loading MKN Media...
      </div>

      <style>
        {`
          @keyframes textFade {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          
          @media (max-width: 768px) {
            div[style*="width: 120px"] {
              width: 90px !important;
              height: 90px !important;
            }
          }
          
          @media (max-width: 480px) {
            div[style*="width: 120px"] {
              width: 70px !important;
              height: 70px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;

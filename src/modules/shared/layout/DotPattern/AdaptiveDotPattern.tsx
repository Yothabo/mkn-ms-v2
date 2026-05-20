import React, { useEffect, useState } from 'react';
import styles from './DotPattern.module.css';

interface AdaptiveDotPatternProps {
  backgroundColor?: 'dark-green' | 'cream' | 'orange';
  opacity?: number;
  dotWidth?: number;
  dotHeight?: number;
  borderRadius?: number;
  gap?: number;
  className?: string;
  pattern?: 'left-vertical' | 'right-vertical' | 'upper-right' | 'bottom-center' | 'all';
}

const AdaptiveDotPattern: React.FC<AdaptiveDotPatternProps> = ({
  backgroundColor = 'dark-green',
  opacity = 0.6,
  dotWidth = 8,
  dotHeight = 5,
  borderRadius = 2,
  gap = 10,
  className = '',
  pattern = 'all'
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine dot color based on background
  const getDotColor = () => {
    switch (backgroundColor) {
      case 'cream':
        return 'rgba(0, 0, 0, 0.25)'; // Dark grey/black on light background
      case 'orange':
        return 'rgba(255, 255, 255, 0.6)'; // White on orange
      case 'dark-green':
      default:
        return 'rgba(255, 255, 255, 0.5)'; // White on dark green
    }
  };

  const dotColor = getDotColor();

  // Pattern configurations
  const patterns = {
    'left-vertical': {
      columns: 1,
      rows: 26,
      position: { left: '2%', top: '50%', transform: 'translateY(-50%)' },
      width: 'auto',
      height: 'auto'
    },
    'right-vertical': {
      columns: 1,
      rows: 26,
      position: { right: '2%', top: '50%', transform: 'translateY(-50%)' },
      width: 'auto',
      height: 'auto'
    },
    'upper-right': {
      columns: 9,
      rows: 7,
      position: { right: '3%', top: '8%' },
      width: 'auto',
      height: 'auto'
    },
    'bottom-center': {
      columns: 10,
      rows: 8,
      position: { left: '50%', bottom: '8%', transform: 'translateX(-50%)' },
      width: 'auto',
      height: 'auto'
    },
    'all': {
      columns: 0,
      rows: 0,
      position: {},
      width: '100%',
      height: '100%'
    }
  };

  const currentPattern = patterns[pattern];
  const totalDots = currentPattern.columns * currentPattern.rows;

  if (!isClient) return null;

  // Render all patterns at once
  if (pattern === 'all') {
    return (
      <>
        {/* Left Vertical */}
        <div
          className={`${styles.adaptiveDotPattern} ${className}`}
          style={{
            position: 'absolute',
            left: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'repeat(26, 1fr)',
            gap: `${gap}px`,
            padding: '1rem',
            pointerEvents: 'none',
            zIndex: 1,
            width: 'auto',
            height: 'auto'
          }}
        >
          {Array.from({ length: 26 }).map((_, index) => (
            <div
              key={`left-${index}`}
              className={styles.adaptiveDot}
              style={{
                width: `${dotWidth}px`,
                height: `${dotHeight}px`,
                backgroundColor: dotColor,
                opacity,
                borderRadius: `${borderRadius}px`,
                margin: 'auto',
                '--dot-index': index
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Right Vertical */}
        <div
          className={`${styles.adaptiveDotPattern} ${className}`}
          style={{
            position: 'absolute',
            right: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'repeat(26, 1fr)',
            gap: `${gap}px`,
            padding: '1rem',
            pointerEvents: 'none',
            zIndex: 1,
            width: 'auto',
            height: 'auto'
          }}
        >
          {Array.from({ length: 26 }).map((_, index) => (
            <div
              key={`right-${index}`}
              className={styles.adaptiveDot}
              style={{
                width: `${dotWidth}px`,
                height: `${dotHeight}px`,
                backgroundColor: dotColor,
                opacity,
                borderRadius: `${borderRadius}px`,
                margin: 'auto',
                '--dot-index': index
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Upper Right Cluster */}
        <div
          className={`${styles.adaptiveDotPattern} ${className}`}
          style={{
            position: 'absolute',
            right: '3%',
            top: '8%',
            display: 'grid',
            gridTemplateColumns: 'repeat(9, 1fr)',
            gridTemplateRows: 'repeat(7, 1fr)',
            gap: `${gap}px`,
            padding: '1rem',
            pointerEvents: 'none',
            zIndex: 1,
            width: 'auto',
            height: 'auto'
          }}
        >
          {Array.from({ length: 63 }).map((_, index) => (
            <div
              key={`upper-${index}`}
              className={styles.adaptiveDot}
              style={{
                width: `${dotWidth}px`,
                height: `${dotHeight}px`,
                backgroundColor: dotColor,
                opacity,
                borderRadius: `${borderRadius}px`,
                margin: 'auto',
                '--dot-index': index % 10
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Bottom Center Cluster */}
        <div
          className={`${styles.adaptiveDotPattern} ${className}`}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '8%',
            transform: 'translateX(-50%)',
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
            gap: `${gap}px`,
            padding: '1rem',
            pointerEvents: 'none',
            zIndex: 1,
            width: 'auto',
            height: 'auto'
          }}
        >
          {Array.from({ length: 80 }).map((_, index) => (
            <div
              key={`bottom-${index}`}
              className={styles.adaptiveDot}
              style={{
                width: `${dotWidth}px`,
                height: `${dotHeight}px`,
                backgroundColor: dotColor,
                opacity,
                borderRadius: `${borderRadius}px`,
                margin: 'auto',
                '--dot-index': index % 10
              } as React.CSSProperties}
            />
          ))}
        </div>
      </>
    );
  }

  // Render single pattern
  return (
    <div
      className={`${styles.adaptiveDotPattern} ${className}`}
      style={{
        position: 'absolute',
        ...currentPattern.position,
        display: 'grid',
        gridTemplateColumns: `repeat(${currentPattern.columns}, 1fr)`,
        gridTemplateRows: `repeat(${currentPattern.rows}, 1fr)`,
        gap: `${gap}px`,
        padding: '1rem',
        pointerEvents: 'none',
        zIndex: 1,
        width: currentPattern.width,
        height: currentPattern.height
      }}
    >
      {Array.from({ length: totalDots }).map((_, index) => (
        <div
          key={index}
          className={styles.adaptiveDot}
          style={{
            width: `${dotWidth}px`,
            height: `${dotHeight}px`,
            backgroundColor: dotColor,
            opacity,
            borderRadius: `${borderRadius}px`,
            margin: 'auto',
            '--dot-index': index % 10
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default AdaptiveDotPattern;

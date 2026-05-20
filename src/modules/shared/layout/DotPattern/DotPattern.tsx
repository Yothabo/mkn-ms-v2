import React, { useMemo } from 'react';
import styles from './DotPattern.module.css';

interface DotPatternProps {
  color?: string;
  opacity?: number;
  size?: 'small' | 'medium' | 'large';
  animationDirection?: 'up' | 'down' | 'none';
}

const DotPattern: React.FC<DotPatternProps> = ({
  color = 'var(--color-cream)',
  opacity = 0.3,
  size = 'medium',
  animationDirection = 'none'
}) => {
  // Calculate dot size based on prop
  const dotSize = useMemo(() => {
    switch (size) {
      case 'small': return 2;
      case 'large': return 4;
      case 'medium':
      default: return 3;
    }
  }, [size]);

  // Calculate spacing based on dot size
  const spacing = useMemo(() => dotSize * 6, [dotSize]);

  // Calculate animation delay for each dot
  const getAnimationDelay = (row: number, col: number) => {
    if (animationDirection === 'none') return '0s';
    
    // Calculate distance from center
    const centerRow = 4; // Approximate center row
    const centerCol = 8; // Approximate center column
    const distance = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2));
    
    // Dots farther from center animate later
    return `${distance * 0.02}s`;
  };

  // Get animation name based on direction
  const getAnimationName = () => {
    switch (animationDirection) {
      case 'up': return 'dotFloatUp';
      case 'down': return 'dotFloatDown';
      default: return 'none';
    }
  };

  // Generate dot grid
  const dotGrid = useMemo(() => {
    const rows = 8;
    const cols = 16;
    const dots = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Create some randomness in opacity for visual interest
        const randomOpacity = opacity * (0.7 + Math.random() * 0.6);
        
        dots.push(
          <div
            key={`${row}-${col}`}
            className={`${styles.dot} ${animationDirection !== 'none' ? styles.animated : ''}`}
            style={{
              position: 'absolute',
              left: `${col * spacing}px`,
              top: `${row * spacing}px`,
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              backgroundColor: color,
              opacity: randomOpacity,
              borderRadius: '50%',
              animation: animationDirection !== 'none' 
                ? `${getAnimationName()} 0.8s ease-out ${getAnimationDelay(row, col)} forwards` 
                : 'none',
              transformOrigin: 'center center',
              willChange: 'transform, opacity'
            }}
            data-row={row}
            data-col={col}
          />
        );
      }
    }

    return dots;
  }, [color, opacity, size, dotSize, spacing, animationDirection]);

  return (
    <div 
      className={styles.dotPattern}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
      data-animation-direction={animationDirection}
    >
      {dotGrid}
      
      <style>{`
        /* Dot floating animations */
        @keyframes dotFloatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-${dotSize * 2}px) scale(1.2);
            opacity: ${opacity * 1.5};
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: ${opacity};
          }
        }

        @keyframes dotFloatDown {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateY(${dotSize * 2}px) scale(1.2);
            opacity: ${opacity * 1.5};
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: ${opacity};
          }
        }

        /* Reduce motion support */
        @media (prefers-reduced-motion: reduce) {
          .${styles.dot} {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DotPattern;

import React, { useEffect, useState, useMemo } from 'react';

interface DotPatternProps {
  color?: string;
  opacity?: number;
  dotSize?: number;
  gap?: number;
  pattern?: 'left-vertical' | 'right-vertical' | 'upper-right' | 'all';
  backgroundColor?: string;
}

const DotPatternV2: React.FC<DotPatternProps> = ({
  color,
  opacity = 0.35,
  dotSize = 5,
  gap = 4, // Reduced gap for more density
  pattern = 'all',
  backgroundColor = 'var(--color-dark-green)'
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine adaptive color with gradient effect
  const adaptiveColor = useMemo(() => {
    if (color) return color;
    
    const bgColor = backgroundColor.toLowerCase();
    if (bgColor.includes('cream') || bgColor.includes('fdfce7') || bgColor.includes('253, 252, 231')) {
      // On cream background - medium grey with slight gradient
      return 'rgba(80, 80, 80, 0.4)';
    } else if (bgColor.includes('orange') || bgColor.includes('ed8f4c') || bgColor.includes('237, 143, 76')) {
      // On orange background - light grey with gradient
      return 'rgba(255, 255, 255, 0.45)';
    } else {
      // On dark green background - light grey with gradient
      return 'rgba(220, 220, 220, 0.4)';
    }
  }, [backgroundColor, color]);

  if (!isClient) return null;

  // Create gradient effect by varying opacity slightly
  const getDotOpacity = (index: number, total: number) => {
    const baseOpacity = opacity;
    // Create subtle gradient: 80% to 100% opacity
    const gradientFactor = 0.8 + (0.2 * (index / total));
    return baseOpacity * gradientFactor;
  };

  // Render all patterns at once
  if (pattern === 'all') {
    return (
      <>
        {/* Left Vertical - 26 dots starting from top left */}
        <div style={{
          position: 'absolute',
          left: '2%',
          top: '5%', // Start from top
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'repeat(26, 1fr)',
          gap: `${gap}px`,
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {Array.from({ length: 26 }).map((_, index) => (
            <div
              key={`left-${index}`}
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                backgroundColor: adaptiveColor,
                opacity: getDotOpacity(index, 26),
                borderRadius: '50%', // Circular dots
                margin: 'auto',
                // Subtle gradient effect
                boxShadow: '0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            />
          ))}
        </div>

        {/* Right Vertical - 26 dots starting from bottom right */}
        <div style={{
          position: 'absolute',
          right: '2%',
          bottom: '5%', // Start from bottom
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'repeat(26, 1fr)',
          gap: `${gap}px`,
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {Array.from({ length: 26 }).map((_, index) => (
            <div
              key={`right-${index}`}
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                backgroundColor: adaptiveColor,
                opacity: getDotOpacity(index, 26),
                borderRadius: '50%', // Circular dots
                margin: 'auto',
                // Subtle gradient effect
                boxShadow: '0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            />
          ))}
        </div>

        {/* Upper Right Cluster - 63 dots (9x7) - keep as is */}
        <div style={{
          position: 'absolute',
          right: '3%',
          top: '8%',
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gridTemplateRows: 'repeat(7, 1fr)',
          gap: `${gap}px`,
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {Array.from({ length: 63 }).map((_, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            // Create gradient from top-left to bottom-right
            const gradientValue = 0.7 + (0.3 * ((row + col) / (7 + 9)));
            return (
              <div
                key={`upper-${index}`}
                style={{
                  width: `${dotSize}px`,
                  height: `${dotSize}px`,
                  backgroundColor: adaptiveColor,
                  opacity: opacity * gradientValue,
                  borderRadius: '50%', // Circular dots
                  margin: 'auto',
                  // Subtle gradient effect
                  boxShadow: '0 0 1px rgba(255, 255, 255, 0.1)'
                }}
              />
            );
          })}
        </div>
      </>
    );
  }

  return null;
};

export default DotPatternV2;

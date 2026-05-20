import React from 'react';
import AdaptiveDotPattern from './AdaptiveDotPattern';
import { ScreenConfig } from '../../../../types/screens';

interface SmartDotPatternProps {
  screenConfig: ScreenConfig;
  opacity?: number;
  dotWidth?: number;
  dotHeight?: number;
  borderRadius?: number;
  gap?: number;
  showLeftVertical?: boolean;
  showRightVertical?: boolean;
  showUpperRight?: boolean;
  showBottomCenter?: boolean;
}

const SmartDotPattern: React.FC<SmartDotPatternProps> = ({
  screenConfig,
  opacity = 0.6,
  dotWidth = 8,
  dotHeight = 5,
  borderRadius = 2,
  gap = 10,
  showLeftVertical = true,
  showRightVertical = true,
  showUpperRight = true,
  showBottomCenter = true
}) => {
  // Determine background color from screen config
  const getBackgroundColor = () => {
    const bgColor = screenConfig.bgColor || screenConfig.backgroundColor || 'var(--color-dark-green)';
    
    if (bgColor.includes('cream') || bgColor === 'var(--color-cream)') {
      return 'cream';
    } else if (bgColor.includes('orange') || bgColor === 'var(--color-orange)') {
      return 'orange';
    } else {
      return 'dark-green';
    }
  };

  const backgroundColor = getBackgroundColor();

  return (
    <>
      {showLeftVertical && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1 }}>
          <AdaptiveDotPattern
            pattern="left-vertical"
            backgroundColor={backgroundColor}
            opacity={opacity}
            dotWidth={dotWidth}
            dotHeight={dotHeight}
            borderRadius={borderRadius}
            gap={gap}
          />
        </div>
      )}
      
      {showRightVertical && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1 }}>
          <AdaptiveDotPattern
            pattern="right-vertical"
            backgroundColor={backgroundColor}
            opacity={opacity}
            dotWidth={dotWidth}
            dotHeight={dotHeight}
            borderRadius={borderRadius}
            gap={gap}
          />
        </div>
      )}
      
      {showUpperRight && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1 }}>
          <AdaptiveDotPattern
            pattern="upper-right"
            backgroundColor={backgroundColor}
            opacity={opacity}
            dotWidth={dotWidth}
            dotHeight={dotHeight}
            borderRadius={borderRadius}
            gap={gap}
          />
        </div>
      )}
      
      {showBottomCenter && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1 }}>
          <AdaptiveDotPattern
            pattern="bottom-center"
            backgroundColor={backgroundColor}
            opacity={opacity}
            dotWidth={dotWidth}
            dotHeight={dotHeight}
            borderRadius={borderRadius}
            gap={gap}
          />
        </div>
      )}
    </>
  );
};

export default SmartDotPattern;

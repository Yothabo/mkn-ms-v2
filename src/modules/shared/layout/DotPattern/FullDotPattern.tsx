import React from 'react';
import DotPatternV2 from './DotPatternV2';

interface FullDotPatternProps {
  opacity?: number;
  backgroundColor?: string;
}

const FullDotPattern: React.FC<FullDotPatternProps> = ({
  opacity = 0.35,
  backgroundColor = 'var(--color-dark-green)'
}) => {
  return (
    <DotPatternV2
      pattern="all"
      opacity={opacity}
      dotSize={5} // Slightly larger for better visibility
      gap={4}     // Reduced gap for more density
      backgroundColor={backgroundColor}
    />
  );
};

export default FullDotPattern;

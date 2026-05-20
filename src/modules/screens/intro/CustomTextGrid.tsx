import React from 'react';

interface TextGridSpan {
  id: number;
  content: string;
  className: string;
  style?: React.CSSProperties;
}

interface CustomTextGridProps {
  spans: TextGridSpan[];
  opacity?: number;
  className?: string;
}

const CustomTextGrid: React.FC<CustomTextGridProps> = ({
  spans,
  opacity = 1,
  className = ''
}) => {
  // Individual color for EACH letter - 12 distinct colors
  const letterBorderColors = [
    '#FF0000', // Red
    '#FF7F00', // Orange
    '#FFFF00', // Yellow
    '#00FF00', // Green
    '#0000FF', // Blue
    '#4B0082', // Indigo
    '#9400D3', // Violet
    '#FF1493', // Deep Pink
    '#00CED1', // Dark Turquoise
    '#FFD700', // Gold
    '#7CFC00', // Lawn Green
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FF4500', // Orange Red
    '#DA70D6', // Orchid
    '#32CD32', // Lime Green
  ];

  // Generate a unique color for each letter position
  const getLetterBorderColor = (letterIndex: number) => {
    return letterBorderColors[letterIndex % letterBorderColors.length];
  };

  // Split content into individual letters for spans that have content
  const renderSpanWithLetterBorders = (span: TextGridSpan) => {
    if (!span.content.trim()) {
      return (
        <span
          key={span.id}
          className={`${span.className} ${className}`}
          style={{
            ...span.style,
            opacity
          }}
        />
      );
    }

    const letters = span.content.split('');
    
    return (
      <span
        key={span.id}
        className={`${span.className} ${className}`}
        style={{
          ...span.style,
          opacity,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          gap: '0.05em'
        }}
      >
        {letters.map((letter, letterIndex) => {
          const borderColor = getLetterBorderColor(letterIndex);
          return (
            <span
              key={`${span.id}-${letterIndex}`}
              style={{
                position: 'relative',
                display: 'inline-block',
                animation: `letterFloat 3s ease-in-out infinite`,
                animationDelay: `${letterIndex * 0.05}s`,
                animationFillMode: 'both'
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
              {/* Unique border for each letter */}
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  bottom: '-2px',
                  border: `2px solid ${borderColor}`,
                  borderRadius: '3px',
                  animation: `borderPulse 2s ease-in-out infinite`,
                  animationDelay: `${letterIndex * 0.05}s`,
                  opacity: 0.8,
                  pointerEvents: 'none',
                  zIndex: -1
                }}
              />
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="custom-text-grid-container" style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      boxSizing: 'border-box',
      overflow: 'visible'
    }}>
      <h1
        className="custom-text-grid"
        style={{
          opacity,
          fontFamily: '"Anton", system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif',
          fontSize: 'clamp(4rem, 2.545rem + 7.27vw, 8rem)',
          lineHeight: '1',
          maxInlineSize: '8ch',
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1ch)',
          position: 'relative',
          zIndex: 1,
          overflow: 'visible',
          marginLeft: '-30px'
        }}
      >
        {spans.map(renderSpanWithLetterBorders)}
      </h1>

      <style>{`
        @keyframes letterFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes borderPulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomTextGrid;

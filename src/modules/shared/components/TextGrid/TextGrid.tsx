import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './TextGrid.module.css';

export interface TextGridSpan {
  id: number;
  content: string;
  className: string;
  style?: React.CSSProperties;
}

export interface TextGridProps {
  spans: TextGridSpan[];
  opacity?: number;
  className?: string;
  animationDelay?: number;
  animateOnLoad?: boolean;
  isExiting?: boolean;
  onAnimationComplete?: () => void;
}

const TextGrid: React.FC<TextGridProps> = ({
  spans,
  opacity = 1,
  className = '',
  animationDelay = 0,
  animateOnLoad = true,
  isExiting = false,
  onAnimationComplete
}) => {
  const [isVisible, setIsVisible] = useState(!animateOnLoad);
  const [animationState, setAnimationState] = useState<'idle' | 'entering' | 'entered' | 'exiting'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLHeadingElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const startEntranceAnimation = useCallback(() => {
    if (animateOnLoad && !isVisible) {
      setAnimationState('entering');
      setIsVisible(true);
      
      timeoutRef.current = setTimeout(() => {
        setAnimationState('entered');
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 800); // Match animation duration
    }
  }, [animateOnLoad, isVisible, onAnimationComplete]);

  const startExitAnimation = useCallback(() => {
    if (isVisible) {
      setAnimationState('exiting');
      
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setAnimationState('idle');
      }, 500); // Match exit animation duration
    }
  }, [isVisible]);

  useEffect(() => {
    if (animateOnLoad && !isVisible) {
      const timer = setTimeout(() => {
        startEntranceAnimation();
      }, animationDelay);
      
      return () => clearTimeout(timer);
    }
  }, [animateOnLoad, isVisible, animationDelay, startEntranceAnimation]);

  useEffect(() => {
    if (isExiting && isVisible && animationState === 'entered') {
      startExitAnimation();
    }
  }, [isExiting, isVisible, animationState, startExitAnimation]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getGridClassName = () => {
    if (animationState === 'entering' || animationState === 'entered') {
      return `${styles.textGrid} ${styles.entering} ${className}`;
    }
    if (animationState === 'exiting') {
      return `${styles.textGrid} ${styles.exiting} ${className}`;
    }
    return `${styles.textGrid} ${className}`;
  };

  const getSpanAnimationDelay = (index: number) => {
    const baseDelay = animationDelay;
    const staggerDelay = index * 0.1;
    return baseDelay + staggerDelay;
  };

  return (
    <div 
      ref={containerRef}
      className={`${styles.textGridContainer} will-change-transform`}
      style={{
        opacity: isVisible ? opacity : 0,
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <h1
        ref={gridRef}
        className={getGridClassName()}
        style={{
          fontFamily: '"Anton", system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif',
          fontSize: 'clamp(4rem, 2.545rem + 7.27vw, 8rem)',
          lineHeight: '1',
          maxInlineSize: '8ch',
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1ch)',
          position: 'relative',
          zIndex: 1,
          overflow: 'visible',
          marginLeft: '-30px',
          transformStyle: 'preserve-3d'
        }}
        data-visible={isVisible}
        data-animation-state={animationState}
      >
        {spans.map((span, index) => (
          <span
            key={span.id}
            className={`${styles[span.className]} ${span.className} will-change-transform`}
            style={{
              ...span.style,
              animationDelay: `${getSpanAnimationDelay(index)}s`,
              animationFillMode: 'forwards'
            }}
            aria-hidden={span.className.includes('span4') || span.className.includes('span7')}
            data-content={span.content}
            data-index={index}
          >
            {span.content}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextGrid;

import React, { ReactNode, useEffect, useState, useRef } from 'react';
import DotPattern from '../shared/layout/DotPattern/DotPattern';
import ContentContainer from '../shared/components/ContentContainer/ContentContainer';
import { ScreenConfig } from '../../types/screens';
import styles from './BaseScreen.module.css';

interface BaseScreenProps {
  config: ScreenConfig;
  children: ReactNode;
  isActive?: boolean;
  transitionDirection?: 'next' | 'prev' | null;
  showDots?: boolean;
  hasModal?: boolean;
}

const BaseScreen: React.FC<BaseScreenProps> = ({
  config,
  children,
  isActive = true,
  transitionDirection = null,
  showDots = false,
  hasModal = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationState, setAnimationState] = useState<'idle' | 'entering' | 'entered' | 'exiting'>('idle');
  const [dotPatternDirection, setDotPatternDirection] = useState<'idle' | 'swipe-next' | 'swipe-prev'>('idle');
  const screenRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const dotPatternRef = useRef<HTMLDivElement>(null);

  const {
    id,
    title,
    number,
    bgColor = 'var(--color-dark-green)',
    textColor = 'var(--color-cream)',
    hasPattern,
    patternColor
  } = config;

  useEffect(() => {
    if (isActive && !isVisible) {
      // ENTERING: New screen becoming active
      setIsVisible(true);
      setAnimationState('entering');
      
      // Set dot pattern direction based on transition
      if (transitionDirection === 'next') {
        setDotPatternDirection('swipe-next');
      } else if (transitionDirection === 'prev') {
        setDotPatternDirection('swipe-prev');
      }

      timeoutRef.current = setTimeout(() => {
        setAnimationState('entered');
        // Reset direction after animation completes
        setTimeout(() => setDotPatternDirection('idle'), 300);
      }, 600);
    } else if (!isActive && isVisible) {
      // EXITING: Screen becoming inactive
      setAnimationState('exiting');
      
      // Set exit direction for dots
      if (transitionDirection === 'next') {
        setDotPatternDirection('swipe-next');
      } else if (transitionDirection === 'prev') {
        setDotPatternDirection('swipe-prev');
      }

      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setAnimationState('idle');
      }, 600);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isActive, isVisible, transitionDirection]);

  const getBackgroundColor = () => {
    if (bgColor?.startsWith('var(--color-')) {
      return bgColor;
    }
    return bgColor || 'var(--color-dark-green)';
  };

  const getTextColor = () => {
    if (textColor?.startsWith('var(--color-')) {
      return textColor;
    }
    return textColor || 'var(--color-cream)';
  };

  const getAnimationClass = () => {
    let baseClass = '';

    if (animationState === 'entering' || animationState === 'entered') {
      baseClass = styles.entering;
    } else if (animationState === 'exiting') {
      baseClass = styles.exiting;
    }

    // Combine animation state with direction for direction-aware animations
    if (baseClass && transitionDirection) {
      return `${baseClass} ${styles[transitionDirection]}`;
    }

    return baseClass;
  };

  // Get dot pattern opacity based on direction and state
  const getDotPatternOpacity = () => {
    if (hasModal) return 0.1;
    
    if (dotPatternDirection === 'swipe-next') {
      return animationState === 'entering' ? 0.5 : 0.3;
    } else if (dotPatternDirection === 'swipe-prev') {
      return animationState === 'entering' ? 0.5 : 0.3;
    }
    
    return 0.35; // Default opacity
  };

  // Get dot pattern animation based on direction
  const getDotPatternAnimation = () => {
    if (dotPatternDirection === 'swipe-next') {
      return animationState === 'entering' ? 'dotsFlowUp 0.6s ease-out' : 
             animationState === 'exiting' ? 'dotsFlowDown 0.6s ease-out' : 'none';
    } else if (dotPatternDirection === 'swipe-prev') {
      return animationState === 'entering' ? 'dotsFlowDown 0.6s ease-out' : 
             animationState === 'exiting' ? 'dotsFlowUp 0.6s ease-out' : 'none';
    }
    return 'none';
  };

  // During exit animations, CSS handles the transform
  // During enter animations, we set initial transform for smooth entry
  const getTransform = () => {
    // During exit, CSS animation handles the transform
    if (animationState === 'exiting') {
      return 'translate3d(0, 0, 0)'; // CSS animation will override this
    }

    // During enter, set initial position based on direction
    if (animationState === 'entering' && transitionDirection) {
      return transitionDirection === 'next'
        ? 'translate3d(0, 60px, 0)'   // Enter from bottom
        : 'translate3d(0, -60px, 0)'; // Enter from top
    }

    // Default: centered
    return 'translate3d(0, 0, 0)';
  };

  const getOpacity = () => {
    // Let CSS handle opacity during animations
    if (animationState === 'entering' || animationState === 'exiting') {
      return 1;
    }

    return isVisible ? 1 : 0;
  };

  const getTransition = () => {
    // Only use inline transition for entering (not exiting)
    if (animationState === 'entering') {
      return 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    // For exiting, CSS animation handles everything
    return 'none';
  };

  return (
    <div
      ref={screenRef}
      id={`screen-${id}`}
      className={`${styles.screen} ${getAnimationClass()} will-change-transform`}
      style={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        opacity: getOpacity(),
        transform: getTransform(),
        transition: getTransition(),
        pointerEvents: isActive ? 'auto' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      data-screen-id={id}
      data-animation-state={animationState}
      data-transition-direction={transitionDirection}
      data-dot-direction={dotPatternDirection}
    >
      {showDots && hasPattern && patternColor && (
        <div
          ref={dotPatternRef}
          className="dot-pattern-float"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: getDotPatternOpacity(),
            transition: 'opacity 0.3s ease',
            animation: getDotPatternAnimation(),
            pointerEvents: 'none'
          }}
        >
          <DotPattern
            color={patternColor}
            opacity={getDotPatternOpacity()}
            size="medium"
            animationDirection={dotPatternDirection === 'swipe-next' ? 'up' : 
                              dotPatternDirection === 'swipe-prev' ? 'down' : 'none'}
          />
        </div>
      )}

      <ContentContainer
        className={styles.contentContainer}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate3d(0, ${isVisible ? 0 : 15}px, 0)`,
          transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s'
        }}
      >
        {children}
      </ContentContainer>

      <style>{`
        .screen-title {
          color: ${getTextColor()};
        }

        .screen-${id}-text {
          color: ${getTextColor()};
        }

        /* Dot pattern animations based on swipe direction */
        @keyframes dotsFlowUp {
          0% {
            transform: translateY(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-10px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0);
            opacity: 0.35;
          }
        }

        @keyframes dotsFlowDown {
          0% {
            transform: translateY(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(10px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0);
            opacity: 0.35;
          }
        }

        /* Direction-aware dot pattern styles */
        [data-dot-direction="swipe-next"] .dot-pattern-float {
          animation: dotsFlowUp 0.6s ease-out;
        }

        [data-dot-direction="swipe-prev"] .dot-pattern-float {
          animation: dotsFlowDown 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BaseScreen;

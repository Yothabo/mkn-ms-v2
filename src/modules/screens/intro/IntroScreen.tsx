import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import BaseScreen from '../BaseScreen';
import TextGrid from '../../shared/components/TextGrid/TextGrid';
import { SCREEN_CONFIGS } from '../../../types/screens';

interface IntroScreenProps {
  isActive?: boolean;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ isActive = true }) => {
  const [firstAnimationStarted, setFirstAnimationStarted] = useState(false);
  const [secondAnimationStarted, setSecondAnimationStarted] = useState(false);

  // Polished animation states
  const [lottieAnimationState, setLottieAnimationState] = useState<'idle' | 'entering' | 'exiting'>('idle');
  const [textAnimationState, setTextAnimationState] = useState<'idle' | 'entering' | 'exiting'>('idle');

  // Performance optimization states
  const [shouldRenderAnimations, setShouldRenderAnimations] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [isSwiping, setIsSwiping] = useState(false);
  const [elementOpacities, setElementOpacities] = useState({
    lottie1: 0,
    lottie2: 0,
    text: 0,
    paragraph: 0
  });

  const animationTimerRef = useRef<NodeJS.Timeout>();
  const swipeEndTimerRef = useRef<NodeJS.Timeout>();
  const lottieRef1 = useRef<any>(null);
  const lottieRef2 = useRef<any>(null);
  const animationFrameRef = useRef<number>();

  const textGridSpans = useMemo(() => [
    {
      id: 1,
      content: "04 February",
      className: "span1",
      style: { color: 'var(--color-dark-green)' }
    },
    {
      id: 2,
      content: "9teen eighty nine",
      className: "span2",
      style: { color: 'var(--color-dark-green)', letterSpacing: '0.08em', textTransform: 'lowercase' }
    },
    {
      id: 3,
      content: "Holy Host",
      className: "span3",
      style: { color: 'var(--color-dark-green)', letterSpacing: '0.1em' }
    },
    {
      id: 4,
      content: "",
      className: "span4",
      style: { backgroundColor: 'var(--color-orange)' }
    },
    {
      id: 5,
      content: "Birthday",
      className: "span5",
      style: { color: 'var(--color-dark-green)' }
    },
    {
      id: 6,
      content: "Anniversary",
      className: "span6",
      style: { color: 'var(--color-dark-green)', letterSpacing: '0.06em' }
    },
    {
      id: 7,
      content: "",
      className: "span7",
      style: { backgroundColor: 'var(--color-orange)' }
    },
    {
      id: 8,
      content: "2026",
      className: "span8",
      style: { color: 'var(--color-dark-green)' }
    }
  ], []);

  // Animation helper for Lottie elements
  const getLottieAnimationStyle = (baseDelay: number, isSecond: boolean = false) => {
    const animationState = lottieAnimationState;
    const opacity = isSecond ? elementOpacities.lottie2 : elementOpacities.lottie1;
    const baseTransform = 'translate(-50%, -50%)';

    if (animationState === 'entering') {
      return {
        opacity: opacity,
        transform: `${baseTransform} translateY(10px)`,
        transition: `opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${baseDelay}ms,
                    transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${baseDelay}ms`
      };
    }

    if (animationState === 'exiting') {
      return {
        opacity: opacity,
        transform: baseTransform,
        transition: `opacity 0.3s ease ${baseDelay}ms,
                    transform 0.3s ease ${baseDelay}ms`
      };
    }

    return {
      opacity: opacity,
      transform: baseTransform,
      transition: 'opacity 0.3s ease, transform 0.3s ease'
    };
  };

  // Check for performance preferences
  useEffect(() => {
    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      setShouldRenderAnimations(false);
      setAnimationSpeed(0);

      // Still show elements but without animations
      setElementOpacities({
        lottie1: 0,
        lottie2: 0,
        text: 1,
        paragraph: 1
      });
      return;
    }

    // Start animations with smooth entrance
    setLottieAnimationState('entering');

    // Staggered opacity animations
    setTimeout(() => setElementOpacities(prev => ({ ...prev, text: 1 })), 100);
    setTimeout(() => setElementOpacities(prev => ({ ...prev, paragraph: 1 })), 300);

    // Start Lottie animations with delay
    const firstTimer = setTimeout(() => {
      setFirstAnimationStarted(true);
      setTimeout(() => setElementOpacities(prev => ({ ...prev, lottie1: 0.8 })), 50);
    }, 500);

    const secondTimer = setTimeout(() => {
      setSecondAnimationStarted(true);
      setTimeout(() => setElementOpacities(prev => ({ ...prev, lottie2: 0.6 })), 50);
    }, 1000);

    // Clean up animation states after entrance
    setTimeout(() => {
      setLottieAnimationState('idle');
    }, 600);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
      if (swipeEndTimerRef.current) {
        clearTimeout(swipeEndTimerRef.current);
      }
    };
  }, []);

  // Optimize animations when screen is not active
  useEffect(() => {
    if (!isActive) {
      setLottieAnimationState('exiting');

      // Fade out elements
      setTimeout(() => {
        setElementOpacities({
          lottie1: 0,
          lottie2: 0,
          text: 0,
          paragraph: 0
        });
      }, 100);

      // Schedule animation pause
      animationTimerRef.current = setTimeout(() => {
        setFirstAnimationStarted(false);
        setSecondAnimationStarted(false);
      }, 300);
    } else {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }

      // Re-enter animations
      setLottieAnimationState('entering');

      setTimeout(() => {
        setElementOpacities({
          lottie1: 0.8,
          lottie2: 0.6,
          text: 1,
          paragraph: 1
        });
      }, 200);

      // Clean up animation states
      setTimeout(() => {
        setLottieAnimationState('idle');
      }, 500);

      // Restart Lottie animations
      setFirstAnimationStarted(true);
      setTimeout(() => setSecondAnimationStarted(true), 300);
    }

    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, [isActive]);

  return (
    <BaseScreen
      config={SCREEN_CONFIGS.intro}
      isActive={isActive}
      showDots={true}
    >
      {/* First Lottie Animation */}
      {shouldRenderAnimations && firstAnimationStarted && (
        <div
          key="lottie-1"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '60%',
            height: '60%',
            zIndex: 1,
            pointerEvents: 'none',
            willChange: 'transform, opacity',
            contain: 'layout paint',
            ...getLottieAnimationStyle(0, false)
          }}
          className="lottie-container"
        >
          <DotLottieReact
            ref={lottieRef1}
            src="https://lottie.host/12761c73-9a70-4dd7-8a64-15bdc56b079f/u7pdpO39Gx.lottie"
            loop
            autoplay={isActive && !isSwiping}
            speed={animationSpeed}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      )}

      {/* Second Lottie Animation */}
      {shouldRenderAnimations && secondAnimationStarted && (
        <div
          key="lottie-2"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50%',
            height: '50%',
            zIndex: 2,
            pointerEvents: 'none',
            willChange: 'transform, opacity',
            contain: 'layout paint',
            ...getLottieAnimationStyle(150, true)
          }}
          className="lottie-container"
        >
          <DotLottieReact
            ref={lottieRef2}
            src="https://lottie.host/0dd3b7f5-3c61-4122-96a6-2e7c45856e12/TlOVFdXCjW.lottie"
            loop
            autoplay={isActive && !isSwiping}
            speed={animationSpeed * 1.05}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      )}

      {/* Minimal fallback for performance */}
      {!shouldRenderAnimations && (
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: `linear-gradient(135deg,
            rgba(184, 134, 11, 0.05) 0%,
            rgba(218, 165, 32, 0.03) 100%)`,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.3
        }} />
      )}

      {/* TextGrid Container - IDENTICAL to GuidelinesScreen and ConductScreen */}
      <div style={{
        position: 'relative',
        width: '100%',
        marginTop: '-30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        opacity: elementOpacities.text,
        transition: 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'auto'
      }}>
        <TextGrid
          spans={textGridSpans}
          opacity={elementOpacities.text}
          className="screen-1-text"
        />
      </div>

      {/* Paragraph - IDENTICAL to GuidelinesScreen and ConductScreen */}
      <div style={{
        margin: '2rem auto',
        maxWidth: '600px',
        width: '100%',
        opacity: elementOpacities.paragraph,
        transition: 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'auto'
      }}>
        <p className="screen-1-text" style={{
          margin: '0 auto 1.5rem',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          fontWeight: 400,
          textAlign: 'center',
          opacity: 0.9,
          color: 'var(--color-dark-green)'
        }}>
          As we mark 37 years of the Holy Host of God in our midst. We stand
          privileged to belong to a congregation that receives God's teachings
          directly, guided by His voice and His presence. Every moment of this
          celebration reminds us how rare and sacred this path is, and how blessed
          we are to walk it together.
        </p>
      </div>

      {/* Optimized Animation Styles */}
      <style>{`
        @keyframes paragraphFade {
          0%, 100% {
            opacity: 0.85;
          }
          50% {
            opacity: 0.95;
          }
        }

        /* Performance optimizations */
        .lottie-container {
          contain: layout paint;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .lottie-container {
            display: none !important;
          }

          div[style*="transform: translateY"] {
            transform: none !important;
            transition: none !important;
          }

          p {
            animation: none !important;
            opacity: 1 !important;
          }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .lottie-container {
            width: 70% !important;
            height: 70% !important;
          }

          div[style*="width: '50%'"] {
            width: 60% !important;
            height: 60% !important;
          }
        }

        /* Small screen optimizations */
        @media (max-width: 480px) {
          .lottie-container {
            width: 75% !important;
            height: 75% !important;
          }

          div[style*="width: '50%'"] {
            width: 65% !important;
            height: 65% !important;
          }
        }

        /* Smooth transitions for all animated elements */
        .lottie-container {
          transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1) !important;
        }
      `}</style>
    </BaseScreen>
  );
};

export default IntroScreen;

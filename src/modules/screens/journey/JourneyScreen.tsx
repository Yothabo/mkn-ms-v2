import React, { useState, useEffect, useRef } from 'react';
import BaseScreen from '../BaseScreen';
import TextGrid from '../../shared/components/TextGrid/TextGrid';
import ActionButton from '../../shared/components/ActionButton/ActionButton';
import Modal from '../../shared/components/Modal/Modal';
import { SCREEN_CONFIGS } from '../../../types/screens';

interface JourneyScreenProps {
  isActive?: boolean;
}

const JourneyScreen: React.FC<JourneyScreenProps> = ({ isActive = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wasActiveRef = useRef(isActive);
  const animationFrameRef = useRef<number>();
  
  // Optimized animation state
  const [modalAnimationState, setModalAnimationState] = useState<'idle' | 'entering' | 'exiting'>('idle');

  const textGridSpans = [
    {
      id: 1,
      content: "All Harmony",
      className: "span1",
      style: { color: 'inherit' }
    },
    {
      id: 2,
      content: "Prosperity Kindness",
      className: "span2",
      style: { color: 'inherit' }
    },
    {
      id: 3,
      content: "Love Serene",
      className: "span3",
      style: { color: 'inherit' }
    },
    {
      id: 4,
      content: "",
      className: "span4",
      style: { backgroundColor: 'var(--color-orange)' }
    },
    {
      id: 5,
      content: "Wellbeing",
      className: "span5",
      style: { color: 'inherit' }
    },
    {
      id: 6,
      content: "Tranquil",
      className: "span6",
      style: { color: 'inherit' }
    },
    {
      id: 7,
      content: "",
      className: "span7",
      style: { backgroundColor: 'var(--color-orange)' }
    },
    {
      id: 8,
      content: "Hope",
      className: "span8",
      style: { color: 'inherit' }
    }
  ];

  const fullStory = `Born on February 4th, 1989, the Host stepped into a world that tested strength far too early. Losing a mother in childhood left a silence that could have ended hope, yet God's presence stepped into the gap. Caring for siblings while still a child forged endurance and a quiet, steady courage.

Growing without motherly love could have broken the family, but God held together what grief tried to scatter. Fear never took root. Compassion did. Each challenge sharpened resilience, and every struggle deepened the Host's awareness of God's voice and steady protection.

What looked like hardship was actually preparation for God's voice to be heard, for us to receive healing, for us to learn His teachings, and for us to get guidance as we always say Muzi KaNkulunkulu university of life. Those responsibilities meant for adults shaped a spirit that understood pain but still chose purpose.

As the days passed, God's presence became apparent. Setbacks lifted instead of crushed. Grace replaced bitterness. Courage replaced fear. Loss pushed the Host closer to God. A life that began in hardship rose into a testimony of guidance, protection, and a blessing to the whole world though a few are chosen.`;

  const shortDescription = `Born on February 4th, 1989, the Host stepped into a world that tested strength far too early. Losing a mother in childhood left a silence that could have ended hope, yet God's presence stepped into the gap. Caring for siblings while still a child forged endurance and a quiet, steady courage.`;

  useEffect(() => {
    if (wasActiveRef.current && !isActive && isModalOpen) {
      const resetTimer = setTimeout(() => {
        setIsModalOpen(false);
      }, 800);
      return () => clearTimeout(resetTimer);
    }
    wasActiveRef.current = isActive;
  }, [isActive, isModalOpen]);

  // Handle animations with requestAnimationFrame
  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (modalAnimationState === 'entering' || modalAnimationState === 'exiting') {
      animationFrameRef.current = requestAnimationFrame(() => {
        // Smooth animation start
      });
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [modalAnimationState]);

  const handleJourneyClick = () => {
    if (isModalOpen) {
      setModalAnimationState('exiting');
      setTimeout(() => {
        setIsModalOpen(false);
        setModalAnimationState('idle');
      }, 400);
    } else {
      setModalAnimationState('entering');
      setIsModalOpen(true);
      
      setTimeout(() => {
        setModalAnimationState('idle');
      }, 500);
    }
  };

  // Animation helper function
  const getElementAnimationStyle = (baseDelay: number, index: number = 0) => {
    const totalDelay = baseDelay + (index * 30); // Fast staggered animations
    
    if (modalAnimationState === 'entering') {
      return {
        opacity: 0,
        transform: 'translateY(8px)',
        animation: `elementFadeInUp 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) ${totalDelay}ms forwards`
      };
    }
    
    if (modalAnimationState === 'exiting') {
      return {
        opacity: 1,
        transform: 'translateY(0)',
        animation: `elementFadeOutDown 0.3s ease ${totalDelay}ms forwards`
      };
    }
    
    return {
      opacity: 1,
      transform: 'translateY(0)'
    };
  };

  const textGridOpacity = isModalOpen ? 0 : 1;
  const mainContentOpacity = isModalOpen ? 0 : 1;

  return (
    <BaseScreen
      config={SCREEN_CONFIGS.journey}
      isActive={isActive}
      showDots={true}
      hasModal={isModalOpen}
    >
      {/* Text Grid - Completely invisible when modal is open */}
      <div style={{
        position: 'relative',
        width: '100%',
        marginTop: '-30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: mainContentOpacity,
        transition: 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isModalOpen ? 'none' : 'auto'
      }}>
        <TextGrid
          spans={textGridSpans}
          opacity={textGridOpacity}
          className="screen-2-text"
        />
      </div>

      {/* Description & Button - Completely invisible when modal is open */}
      <div style={{
        margin: '2rem auto',
        maxWidth: '600px',
        width: '100%',
        opacity: mainContentOpacity,
        transition: 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isModalOpen ? 'none' : 'auto'
      }}>
        <p className="screen-2-text" style={{
          margin: '0 auto 1.5rem',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          fontWeight: 400,
          textAlign: 'center',
          opacity: 0.9,
          color: 'var(--color-cream)'
        }}>
          {shortDescription}
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleJourneyClick}
            className="screen-2-text"
            style={{
              padding: '0.5rem 1.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'rgba(253, 252, 231, 0.15)',
              border: '1px solid rgba(253, 252, 231, 0.3)',
              borderRadius: '6px',
              color: 'var(--color-cream)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform, background-color, border-color'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(253, 252, 231, 0.25)';
              e.currentTarget.style.borderColor = 'var(--color-cream)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(253, 252, 231, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(253, 252, 231, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            The Journey
          </button>
        </div>
      </div>

      {/* Journey Modal - FLAT on screen */}
      {isModalOpen && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '500px',
          padding: '0 1.5rem',
          zIndex: 10,
          pointerEvents: 'auto'
        }}>
          {/* Modal Header */}
          <div style={{ 
            marginBottom: '1rem',
            textAlign: 'left',
            willChange: 'transform, opacity',
            ...getElementAnimationStyle(0)
          }}>
            <h3 className="screen-2-text" style={{ 
              fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
              fontWeight: 700,
              margin: '0 0 0.3rem',
              lineHeight: '1.3',
              color: 'var(--color-cream)',
              textAlign: 'center'
            }}>
              The Journey of the Host
            </h3>
          </div>

          {/* Story Content - LEFT ALIGNED PARAGRAPHS */}
          <div style={{ 
            marginBottom: '1.5rem',
            willChange: 'transform, opacity',
            ...getElementAnimationStyle(30)
          }}>
            <div style={{
              textAlign: 'left', // LEFT ALIGNED
              fontSize: 'clamp(0.7rem, 2.5vw, 0.8rem)',
              lineHeight: '1.6',
              color: 'rgba(253, 252, 231, 0.7)',
              whiteSpace: 'pre-line'
            }}>
              {/* Split the story into paragraphs for better animation */}
              {fullStory.split('\n\n').map((paragraph, index) => (
                <div
                  key={index}
                  className="screen-2-text"
                  style={{
                    marginBottom: index < fullStory.split('\n\n').length - 1 ? '1.2rem' : '0',
                    textAlign: 'left', // LEFT ALIGNED
                    willChange: 'transform, opacity',
                    ...getElementAnimationStyle(60 + (index * 40), index)
                  }}
                >
                  {paragraph}
                </div>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '0.8rem',
            paddingTop: '0.8rem',
            borderTop: '1px solid rgba(253, 252, 231, 0.1)',
            willChange: 'transform, opacity',
            ...getElementAnimationStyle(300)
          }}>
            <button
              onClick={handleJourneyClick}
              className="screen-2-text"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'none',
                border: '1px solid rgba(253, 252, 231, 0.3)',
                color: 'var(--color-cream)',
                padding: '0.4rem 1rem',
                borderRadius: '6px',
                fontSize: 'clamp(0.7rem, 2.8vw, 0.8rem)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(253, 252, 231, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(253, 252, 231, 0.5)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.borderColor = 'rgba(253, 252, 231, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Close</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: 'transform 0.2s ease' }}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile-specific responsive styles */}
      <style>{`
        @keyframes elementFadeInUp {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes elementFadeOutDown {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(8px);
          }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          /* Move modal slightly higher on mobile for better visibility */
          div[style*="top: '50%'"] {
            top: 48% !important;
          }
          
          /* Adjust paragraph spacing for mobile */
          div[style*="marginBottom: '1.2rem'"] {
            marginBottom: 1rem !important;
          }
          
          /* Increase font size slightly for better mobile reading */
          div[style*="font-size: clamp(0.7rem, 2.5vw, 0.8rem)"] {
            font-size: clamp(0.72rem, 2.6vw, 0.82rem) !important;
            line-height: 1.65 !important;
          }
          
          /* Very small screen adjustments */
          @media (max-width: 480px) {
            div[style*="top: '50%'"] {
              top: 46% !important;
              padding: 0 1rem !important;
            }
            
            /* Further increase paragraph spacing for readability */
            div[style*="marginBottom: '1.2rem'"] {
              marginBottom: 1.1rem !important;
            }
          }
        }

        /* Tablet optimizations */
        @media (min-width: 769px) and (max-width: 1024px) {
          /* Slightly increase font size for tablet reading */
          div[style*="font-size: clamp(0.7rem, 2.5vw, 0.8rem)"] {
            font-size: clamp(0.75rem, 2.6vw, 0.85rem) !important;
            line-height: 1.7 !important;
          }
        }

        /* Large desktop optimizations */
        @media (min-width: 1025px) {
          /* Increase max-width for better reading on large screens */
          div[style*="maxWidth: '500px'"] {
            maxWidth: 550px !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </BaseScreen>
  );
};

export default JourneyScreen;

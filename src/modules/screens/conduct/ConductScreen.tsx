import React, { useState, useEffect, useRef } from 'react';
import BaseScreen from '../BaseScreen';
import TextGrid from '../../shared/components/TextGrid/TextGrid';
import ActionButton from '../../shared/components/ActionButton/ActionButton';
import Modal from '../../shared/components/Modal/Modal';
import { SCREEN_CONFIGS } from '../../../types/screens';

interface ConductScreenProps {
  isActive?: boolean;
}

const ConductScreen: React.FC<ConductScreenProps> = ({ isActive = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wasActiveRef = useRef(isActive);
  const animationFrameRef = useRef<number>();
  
  // Optimized animation state
  const [modalAnimationState, setModalAnimationState] = useState<'idle' | 'entering' | 'exiting'>('idle');

  const textGridSpans = [
    {
      id: 1,
      content: "Discipline",
      className: "span1",
      style: { color: 'inherit' }
    },
    {
      id: 2,
      content: "code of conduct",
      className: "span2",
      style: { color: 'inherit' }
    },
    {
      id: 3,
      content: "tone dignity",
      className: "span3",
      style: { color: 'inherit' }
    },
    {
      id: 4,
      content: "",
      className: "span4",
      style: { background: 'none' }
    },
    {
      id: 5,
      content: "Respect",
      className: "span5",
      style: { color: 'inherit' }
    },
    {
      id: 6,
      content: "Presence Presentation",
      className: "span6",
      style: { color: 'inherit' }
    },
    {
      id: 7,
      content: "",
      className: "span7",
      style: { background: 'none' }
    },
    {
      id: 8,
      content: "Value",
      className: "span8",
      style: { color: 'inherit' }
    }
  ];

  const conductSections = [
    {
      id: 1,
      title: "Attire & Presentation",
      items: [
        "Wear attire that reflects unity and dignity.",
        "Choose clothing that aligns with the standards of decency and the spirit of the ceremony.",
        "Ensure your outfit is neat, presentable, and appropriate for standing before the congregation.",
        "Maintain uniformity within your group when performing."
      ]
    },
    {
      id: 2,
      title: "Behavior & Discipline",
      items: [
        "Carry yourself with composure from the moment you enter the venue.",
        "Keep actions respectful, controlled, and intentional.",
        "Avoid unnecessary movement or distractions while on stage or in sight of the congregation.",
        "Let your presence represent maturity, obedience, and respect for God's house."
      ]
    },
    {
      id: 3,
      title: "Tone & Expression",
      items: [
        "Speak and respond with calmness and clarity.",
        "Keep your tone respectful when addressing leaders, fellow members, or the audience.",
        "Express gratitude, humility, and reverence through your posture and voice.",
        "Allow your manner of expression to uplift the moment, not distract from it."
      ]
    },
    {
      id: 4,
      title: "Reverence & Presence",
      items: [
        "Remember that every act, big or small, is part of serving God.",
        "Hold the spirit of reverence at the center of your performance and participation.",
        "Stand with intention, understanding that you are offering a gift before God.",
        "Let your conduct mirror the honor of the day and the presence we gather to celebrate."
      ]
    }
  ];

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

  const handleConductClick = () => {
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
      config={SCREEN_CONFIGS.conduct}
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
          className="screen-4-text"
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
        <p className="screen-4-text" style={{
          margin: '0 auto 1.5rem',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          fontWeight: 400,
          textAlign: 'center',
          opacity: 0.9,
          color: 'var(--color-cream)'
        }}>
          From the attire that carries our unity to the dress code worn with
          purpose while performing, every detail reflects the respect we hold
          for God's presence. Behavior, tone, and discipline guide how we stand
          before the congregation and how we offer our gifts.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleConductClick}
            className="screen-4-text"
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
            Conduct Guidelines
          </button>
        </div>
      </div>

      {/* Conduct Modal - FLAT on screen (no background/overlay) */}
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
            marginBottom: '1rem', // Reduced from 1.2rem
            textAlign: 'left',
            willChange: 'transform, opacity',
            ...getElementAnimationStyle(0)
          }}>
            <h3 className="screen-4-text" style={{ 
              fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', // Slightly larger
              fontWeight: 700,
              margin: '0 0 0.8rem', // Better spacing
              lineHeight: '1.3',
              color: 'var(--color-cream)',
              textAlign: 'center'
            }}>
              Code of Conduct
            </h3>
          </div>

          {/* Sections Grid with individual animations - 1fr 1fr maintained */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.7rem', // Balanced gap
            marginBottom: '0.8rem'
          }}>
            {conductSections.map((section, sectionIndex) => (
              <div
                key={section.id}
                style={{
                  padding: '0.7rem', // Good readable padding
                  borderRadius: '8px', // Comfortable radius
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem', // Balanced spacing
                  background: 'rgba(253, 252, 231, 0.1)',
                  border: '1px solid rgba(253, 252, 231, 0.3)',
                  minHeight: '135px', // Good height for content
                  willChange: 'transform, opacity',
                  ...getElementAnimationStyle(30, sectionIndex)
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(253, 252, 231, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(253, 252, 231, 0.3)';
                }}
              >
                {/* Section Title - Readable size */}
                <h4 className="screen-4-text" style={{ 
                  fontSize: 'clamp(0.72rem, 2.8vw, 0.82rem)', // Better readability
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: '1.3', // Better line height
                  color: 'var(--color-cream)',
                  textAlign: 'left'
                }}>
                  {section.title}
                </h4>
                
                {/* Section Items - Comfortable reading size */}
                <div style={{ 
                  flex: 1, 
                  textAlign: 'left',
                  overflow: 'hidden'
                }}>
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="screen-4-text"
                      style={{
                        fontSize: 'clamp(0.65rem, 2.5vw, 0.75rem)', // Comfortable reading
                        lineHeight: '1.4', // Good readability
                        marginBottom: '0.3rem', // Proper spacing
                        position: 'relative',
                        paddingLeft: '0.7rem', // Comfortable indentation
                        color: 'rgba(253, 252, 231, 0.7)',
                        textAlign: 'left',
                        willChange: 'transform, opacity',
                        ...getElementAnimationStyle(150 + (sectionIndex * 40), itemIndex)
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        opacity: 0.6,
                        fontSize: '0.8rem' // Visible bullet
                      }}>•</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Close Button - Comfortable size */}
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
              onClick={handleConductClick}
              className="screen-4-text"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem', // Comfortable gap
                background: 'none',
                border: '1px solid rgba(253, 252, 231, 0.3)',
                color: 'var(--color-cream)',
                padding: '0.4rem 1rem', // Good tap target
                borderRadius: '6px',
                fontSize: 'clamp(0.7rem, 2.8vw, 0.8rem)', // Readable size
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
                width="14" // Good icon size
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

        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          /* Adjust grid for better mobile reading */
          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            gap: 0.6rem !important;
          }
          
          /* Adjust card sizing for mobile */
          div[style*="min-height: '135px'"] {
            padding: 0.6rem !important;
            min-height: 130px !important;
          }
          
          /* Improve readability on very small screens */
          @media (max-width: 480px) {
            h4.screen-4-text {
              font-size: 0.7rem !important;
              line-height: 1.2 !important;
            }
            
            div.screen-4-text[style*="font-size: clamp"] {
              font-size: 0.63rem !important;
              line-height: 1.35 !important;
            }
            
            /* Stack only when absolutely necessary for readability */
            @media (max-width: 350px) and (orientation: portrait) {
              div[style*="gridTemplateColumns: '1fr 1fr'"] {
                gridTemplateColumns: 1fr !important;
                gap: 0.7rem !important;
              }
              
              div[style*="min-height: '135px'"] {
                min-height: auto !important;
                padding: 0.8rem !important;
              }
              
              /* Increase font sizes when stacked for better reading */
              h4.screen-4-text {
                font-size: 0.75rem !important;
              }
              
              div.screen-4-text[style*="font-size: clamp"] {
                font-size: 0.68rem !important;
                line-height: 1.4 !important;
              }
            }
          }
        }

        /* Tablet optimizations */
        @media (min-width: 769px) and (max-width: 1024px) {
          /* Slightly increase sizes for tablet */
          div[style*="min-height: '135px'"] {
            min-height: 145px !important;
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

export default ConductScreen;

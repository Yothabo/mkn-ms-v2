import React, { useState, useEffect, useRef } from 'react';
import BaseScreen from '../BaseScreen';
import TextGrid from '../../shared/components/TextGrid/TextGrid';
import ActionButton from '../../shared/components/ActionButton/ActionButton';
import Modal from '../../shared/components/Modal/Modal';
import { SCREEN_CONFIGS } from '../../../types/screens';

interface GuidelinesScreenProps {
  isActive?: boolean;
}

const GuidelinesScreen: React.FC<GuidelinesScreenProps> = ({ isActive = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wasActiveRef = useRef(isActive);
  const animationFrameRef = useRef<number>();
  
  // Optimized animation state
  const [modalAnimationState, setModalAnimationState] = useState<'idle' | 'entering' | 'exiting'>('idle');

  const textGridSpans = [
    {
      id: 1,
      content: "Art",
      className: "span1",
      style: { color: 'inherit' }
    },
    {
      id: 2,
      content: "Performances Creativity",
      className: "span2",
      style: { color: 'inherit' }
    },
    {
      id: 3,
      content: "Expression Music",
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
      content: "Drama",
      className: "span5",
      style: { color: 'inherit' }
    },
    {
      id: 6,
      content: "Showcase Rhythm",
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
      content: "Praise",
      className: "span8",
      style: { color: 'inherit' }
    }
  ];

  const activityButtons = [
    { id: 1, label: "Choir competition" },
    { id: 2, label: "Traditional dance" },
    { id: 3, label: "Poetry recitals" },
    { id: 4, label: "Additional activities" }
  ];

  const guidelineSections = [
    {
      id: 1,
      title: "Timelines",
      items: [
        "Step onto the stage immediately when called",
        "Choirs: 2 songs, max 8 minutes total",
        "Poets: 1 piece, 5 minutes max",
        "Drama: Full story within 15 minutes"
      ]
    },
    {
      id: 2,
      title: "Performance & Technique",
      items: [
        "Choreography with intention and unity",
        "Formed entrance and exit with discipline",
        "Appropriate, uniform attire aligned with standards",
        "Choir uniformity for one voice, one body"
      ]
    },
    {
      id: 3,
      title: "Leader / Signaler",
      items: [
        "Command with clarity and confidence",
        "Guide with sharp, steady signals in full sync"
      ]
    },
    {
      id: 4,
      title: "Overall Effects",
      items: [
        "Engage audience visibly",
        "Align with ceremony theme",
        "Maintain presence with intentional eye contact"
      ]
    }
  ];

  const registrationCards = [
    {
      id: 1,
      lines: [
        { label: "Opened:", value: "20 December 2025" },
        { label: "Closes:", value: "20 January 2026" }
      ]
    },
    {
      id: 2,
      lines: [
        { label: "WhatsApp:", value: "+263 78 752 8022" },
        { label: "Email:", value: "info@mknmedia.org" }
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

  const handleGuidelinesClick = () => {
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
    const totalDelay = baseDelay + (index * 25); // Fast staggered animations
    
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
      config={SCREEN_CONFIGS.guidelines}
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
          className="screen-3-text"
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
        <p className="screen-3-text" style={{
          margin: '0 auto 1.5rem',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          fontWeight: 400,
          textAlign: 'center',
          opacity: 0.9,
          color: 'var(--color-cream)'
        }}>
          Heavenly melodies rise through the music, drama and poetry spark with
          fire and emotion, modeling carries its stride with purpose, and
          competitions bring a vibrant energy to the gathering. Each activity
          becomes a language of its own.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleGuidelinesClick}
            className="screen-3-text"
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
            Guidelines
          </button>
        </div>
      </div>

      {/* Guidelines Modal - FLAT on screen, MOVED UP */}
      {isModalOpen && (
        <div style={{
          position: 'absolute',
          top: '45%', // MOVED UP from 50%
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '500px',
          padding: '0 1.5rem',
          zIndex: 10,
          pointerEvents: 'auto'
        }}>
          {/* Modal Header - Event Activities */}
          <div style={{ 
            marginBottom: '1rem',
            textAlign: 'left',
            willChange: 'transform, opacity',
            ...getElementAnimationStyle(0)
          }}>
            <h3 className="screen-3-text" style={{ 
              fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
              fontWeight: 700,
              margin: '0 0 0.3rem',
              lineHeight: '1.3',
              color: 'var(--color-cream)',
              textAlign: 'left'
            }}>
              Event Activities
            </h3>
            
            {/* Activity Buttons Grid */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.5rem',
              marginTop: '0.8rem'
            }}>
              {activityButtons.map((activity, index) => (
                <div
                  key={activity.id}
                  className="screen-3-text"
                  style={{
                    padding: '0.5rem 0.3rem',
                    fontSize: 'clamp(0.65rem, 2.5vw, 0.75rem)',
                    borderRadius: '6px',
                    textAlign: 'center',
                    background: 'rgba(253, 252, 231, 0.15)',
                    border: '1px solid rgba(253, 252, 231, 0.3)',
                    color: 'rgba(253, 252, 231, 0.7)',
                    willChange: 'transform, opacity',
                    ...getElementAnimationStyle(30, index)
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(253, 252, 231, 0.25)';
                    e.currentTarget.style.borderColor = 'var(--color-cream)';
                    e.currentTarget.style.color = 'var(--color-cream)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(253, 252, 231, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(253, 252, 231, 0.3)';
                    e.currentTarget.style.color = 'rgba(253, 252, 231, 0.7)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {activity.label}
                </div>
              ))}
            </div>
          </div>

          {/* Performance Guidelines */}
          <div style={{ 
            marginBottom: '1rem',
            willChange: 'transform, opacity',
            ...getElementAnimationStyle(100)
          }}>
            <h3 className="screen-3-text" style={{ 
              fontSize: 'clamp(0.85rem, 3vw, 1rem)',
              fontWeight: 700,
              margin: '0 0 0.8rem',
              lineHeight: '1.3',
              color: 'var(--color-cream)',
              textAlign: 'left'
            }}>
              Performance Guidelines
            </h3>
            
            {/* Guidelines Sections Grid - 1fr 1fr */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.7rem'
            }}>
              {guidelineSections.map((section, sectionIndex) => (
                <div
                  key={section.id}
                  style={{
                    padding: '0.7rem',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    background: 'rgba(253, 252, 231, 0.1)',
                    border: '1px solid rgba(253, 252, 231, 0.3)',
                    minHeight: '135px',
                    willChange: 'transform, opacity',
                    ...getElementAnimationStyle(130, sectionIndex)
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
                  {/* Section Title */}
                  <h4 className="screen-3-text" style={{ 
                    fontSize: 'clamp(0.72rem, 2.8vw, 0.82rem)',
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: '1.3',
                    color: 'var(--color-cream)',
                    textAlign: 'left'
                  }}>
                    {section.title}
                  </h4>
                  
                  {/* Section Items */}
                  <div style={{ 
                    flex: 1, 
                    textAlign: 'left',
                    overflow: 'hidden'
                  }}>
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="screen-3-text"
                        style={{
                          fontSize: 'clamp(0.65rem, 2.5vw, 0.75rem)',
                          lineHeight: '1.4',
                          marginBottom: '0.3rem',
                          position: 'relative',
                          paddingLeft: '0.7rem',
                          color: 'rgba(253, 252, 231, 0.7)',
                          textAlign: 'left',
                          willChange: 'transform, opacity',
                          ...getElementAnimationStyle(250 + (sectionIndex * 40), itemIndex)
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: '0',
                          top: '0',
                          opacity: 0.6,
                          fontSize: '0.8rem'
                        }}>•</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Section */}
          <div style={{ 
            marginBottom: '1rem',
            willChange: 'transform, opacity',
            ...getElementAnimationStyle(350)
          }}>
            <h3 className="screen-3-text" style={{ 
              fontSize: 'clamp(0.85rem, 3vw, 1rem)',
              fontWeight: 700,
              margin: '0 0 0.8rem',
              lineHeight: '1.3',
              color: 'var(--color-cream)',
              textAlign: 'left'
            }}>
              Registration
            </h3>
            
            {/* Registration Cards Grid */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.7rem'
            }}>
              {registrationCards.map((card, cardIndex) => (
                <div
                  key={card.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    background: 'rgba(253, 252, 231, 0.1)',
                    border: '1px solid rgba(253, 252, 231, 0.3)',
                    minHeight: '90px',
                    willChange: 'transform, opacity',
                    ...getElementAnimationStyle(380, cardIndex)
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
                  <div style={{ textAlign: 'left' }}>
                    {card.lines.map((line, lineIndex) => (
                      <div
                        key={lineIndex}
                        style={{
                          marginBottom: lineIndex < card.lines.length - 1 ? '0.4rem' : '0'
                        }}
                      >
                        <div
                          className="screen-3-text"
                          style={{
                            fontSize: 'clamp(0.68rem, 2.5vw, 0.78rem)',
                            fontWeight: 600,
                            lineHeight: '1.2',
                            marginBottom: '0.1rem',
                            color: 'var(--color-cream)',
                            textAlign: 'left'
                          }}
                        >
                          {line.label}
                        </div>
                        <div
                          className="screen-3-text"
                          style={{
                            fontSize: 'clamp(0.62rem, 2.3vw, 0.72rem)',
                            lineHeight: '1.2',
                            color: 'rgba(253, 252, 231, 0.7)',
                            textAlign: 'left'
                          }}
                        >
                          {line.value}
                        </div>
                      </div>
                    ))}
                  </div>
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
            ...getElementAnimationStyle(420)
          }}>
            <button
              onClick={handleGuidelinesClick}
              className="screen-3-text"
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
          /* Move modal even higher on mobile */
          div[style*="top: '45%'"] {
            top: 42% !important;
          }
          
          /* Adjust grid gaps */
          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            gap: 0.6rem !important;
          }
          
          /* Adjust section card sizes */
          div[style*="min-height: '135px'"] {
            padding: 0.6rem !important;
            min-height: 130px !important;
          }
          
          /* Adjust registration cards */
          div[style*="min-height: '90px'"] {
            padding: 0.6rem !important;
            min-height: 85px !important;
          }
          
          /* Very small screen adjustments */
          @media (max-width: 480px) {
            div[style*="top: '45%'"] {
              top: 40% !important;
              padding: 0 1rem !important;
            }
            
            /* Stack only when necessary */
            @media (max-width: 350px) and (orientation: portrait) {
              div[style*="gridTemplateColumns: '1fr 1fr'"] {
                gridTemplateColumns: 1fr !important;
                gap: 0.7rem !important;
              }
              
              div[style*="min-height: '135px'"] {
                min-height: auto !important;
                padding: 0.8rem !important;
              }
              
              div[style*="min-height: '90px'"] {
                min-height: auto !important;
                padding: 0.8rem !important;
              }
              
              /* Activity buttons stack on very small */
              div[style*="gridTemplateColumns: 'repeat(2, 1fr)'"] {
                gridTemplateColumns: 1fr !important;
                gap: 0.5rem !important;
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
          
          div[style*="min-height: '90px'"] {
            min-height: 95px !important;
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

export default GuidelinesScreen;

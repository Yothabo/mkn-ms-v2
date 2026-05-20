import React, { useState } from 'react';
import BaseScreen from '../BaseScreen';
import TextGrid from '../../shared/components/TextGrid/TextGrid';
import { SCREEN_CONFIGS } from '../../../types/screens';
import screenStyles from '../BaseScreen.module.css';

interface EntryScreenProps {
  isActive?: boolean;
  onGetStarted?: () => void;
}

const EntryScreen: React.FC<EntryScreenProps> = ({
  isActive = true,
  onGetStarted
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const textGridSpans = [
    {
      id: 1,
      content: "The Internet",
      className: "span1",
      style: { color: 'transparent' }
    },
    {
      id: 2,
      content: "Blueberry flavoured",
      className: "span2",
      style: { color: 'transparent' }
    },
    {
      id: 3,
      content: "Live Events",
      className: "span3",
      style: { color: 'transparent' }
    },
    {
      id: 4,
      content: "",
      className: "span4",
      style: {
        backgroundColor: 'var(--color-orange)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 5,
      content: "MKNmedia",
      className: "span5",
      style: {
        color: 'inherit',
        textTransform: 'none'
      }
    },
    {
      id: 6,
      content: "updates",
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
      content: "Cand",
      className: "span8",
      style: { color: 'transparent' }
    }
  ];

  const handleGetStarted = () => {
    if (!isClicked && onGetStarted) {
      setIsClicked(true);
      setTimeout(() => {
        onGetStarted();
        setIsClicked(false);
      }, 500);
    }
  };

  return (
    <BaseScreen
      config={SCREEN_CONFIGS.entry}
      isActive={isActive}
      showDots={true}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        marginTop: '-30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <TextGrid
          spans={textGridSpans}
          opacity={1}
          className="screen-0-text"
        />
      </div>

      <div className={screenStyles.descriptionContainer}>
        <p className={`${screenStyles.description} screen-0-text`} style={{
          marginTop: '30px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Experience the pulse of our events as they unfold. Stay connected with
          real-time updates and the moments that shape our gatherings. Move with
          clarity, and let shared awareness carry you forward as you prepare for
          each opportunity to celebrate God's love.
        </p>

        <div className={screenStyles.buttonWrapper} style={{ justifyContent: 'center' }}>
          <button
            onClick={handleGetStarted}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleGetStarted();
              }
            }}
            className="screen-0-text entry-button"
            style={{
              minWidth: '140px',
              minHeight: '44px',
              height: 'auto',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: '2px solid currentColor',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'inherit',
              padding: '12px 24px',
              position: 'relative',
              overflow: 'visible',
              transition: 'transform 0.2s ease',
              fontWeight: 600,
              fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
              letterSpacing: '0.03em'
            }}
            aria-label="Get started - navigate to next screen"
            disabled={isClicked}
          >
            <span style={{ marginRight: '8px' }}>Get Started</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                animation: 'subtlePulse 3.2s ease-in-out infinite',
                color: 'inherit'
              }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>

            {isClicked && (
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  borderRadius: '8px',
                  backgroundColor: 'color-mix(in srgb, currentColor 15%, transparent)',
                  animation: 'fadeOut 0.5s ease-out forwards',
                  pointerEvents: 'none'
                }}
              />
            )}

            <div
              style={{
                position: 'absolute',
                top: '-8px',
                left: '-8px',
                right: '-8px',
                bottom: '-8px',
                borderRadius: '8px',
                border: '1px solid currentColor',
                animation: 'continuousPulse 3.2s ease-in-out infinite',
                pointerEvents: 'none',
                opacity: 0.3
              }}
            />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes continuousPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.3;
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 0.8;
          }
          70% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </BaseScreen>
  );
};

export default EntryScreen;

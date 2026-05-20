import React, { useState, useEffect, useRef } from 'react';
import { IoIosWarning } from 'react-icons/io';
import BaseScreen from '../BaseScreen';
import TextGrid from '../../shared/components/TextGrid/TextGrid';
import ActionButton from '../../shared/components/ActionButton/ActionButton';
import Modal from '../../shared/components/Modal/Modal';
import { SCREEN_CONFIGS } from '../../../types/screens';

interface FeedbackScreenProps {
  isActive?: boolean;
}

interface TextGridSpan {
  id: number;
  content: string;
  className: string;
  style: React.CSSProperties;
}

interface FeedbackOption {
  value: string;
  label: string;
}

interface FormData {
  name: string;
  surname: string;
  cardNumber: string;
  email: string;
  helpType: string;
  comments: string;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ isActive = true }) => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    cardNumber: '',
    email: '',
    helpType: '',
    comments: ''
  });

  const wasActiveRef = useRef(isActive);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number>();

  // Optimized animation states
  const [modalAnimationState, setModalAnimationState] = useState<'idle' | 'entering' | 'exiting'>('idle');
  const [warningAnimationState, setWarningAnimationState] = useState<'idle' | 'entering' | 'exiting'>('idle');

  // Text Grid Configuration
  const textGridSpans: TextGridSpan[] = [
    {
      id: 1,
      content: "queries",
      className: "span1",
      style: { color: 'var(--color-cream)' }
    },
    {
      id: 2,
      content: "comment",
      className: "span2",
      style: { color: 'var(--color-cream)' }
    },
    {
      id: 3,
      content: "contact",
      className: "span3",
      style: { color: 'var(--color-cream)' }
    },
    {
      id: 4,
      content: "",
      className: "span4",
      style: { backgroundColor: 'var(--color-dark-green)' }
    },
    {
      id: 5,
      content: "delivery",
      className: "span5",
      style: { color: 'var(--color-cream)' }
    },
    {
      id: 6,
      content: "suggestions",
      className: "span6",
      style: { color: 'var(--color-cream)' }
    },
    {
      id: 7,
      content: "",
      className: "span7",
      style: { backgroundColor: 'var(--color-dark-green)' }
    },
    {
      id: 8,
      content: "care",
      className: "span8",
      style: { color: 'var(--color-cream)' }
    }
  ];

  const feedbackOptions: FeedbackOption[] = [
    { value: 'comment', label: 'Comment' },
    { value: 'suggestion', label: 'Suggestion' },
    { value: 'enquire', label: 'Enquire' },
    { value: 'compliment', label: 'Compliment' },
    { value: 'concern', label: 'Concern' },
    { value: 'other', label: 'Other' }
  ];

  // Effects
  useEffect(() => {
    if (wasActiveRef.current && !isActive && isModalOpen) {
      const resetTimer = setTimeout(() => {
        setIsModalOpen(false);
        resetForm();
      }, 800);
      return () => clearTimeout(resetTimer);
    }
    wasActiveRef.current = isActive;
  }, [isActive, isModalOpen]);

  // Effect to show warning after 5 seconds when modal opens
  useEffect(() => {
    if (isModalOpen && !showWarningModal) {
      // Clear any existing timer
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
      }

      // Set new timer for 5 seconds
      warningTimerRef.current = setTimeout(() => {
        setWarningAnimationState('entering');
        setShowWarningModal(true);
        
        // Clean up entering state after animation completes
        setTimeout(() => {
          setWarningAnimationState('idle');
        }, 500);
      }, 5000);

      // Cleanup timer on unmount or when modal closes
      return () => {
        if (warningTimerRef.current) {
          clearTimeout(warningTimerRef.current);
          warningTimerRef.current = null;
        }
      };
    }

    // Clear timer if modal closes or warning is shown
    if (!isModalOpen || showWarningModal) {
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
        warningTimerRef.current = null;
      }
    }
  }, [isModalOpen, showWarningModal]);

  // Handle modal animations with requestAnimationFrame for smoothness
  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (modalAnimationState === 'entering' || modalAnimationState === 'exiting') {
      animationFrameRef.current = requestAnimationFrame(() => {
        // Animation frame ensures smooth start
      });
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [modalAnimationState]);

  // Handlers
  const handleFeedbackClick = () => {
    if (isModalOpen) {
      setModalAnimationState('exiting');
      setTimeout(() => {
        setIsModalOpen(false);
        setModalAnimationState('idle');
        setShowWarningModal(false);
        resetForm();
      }, 400);
    } else {
      setModalAnimationState('entering');
      setIsModalOpen(true);
      setShowWarningModal(false);
      
      // Clean up entering state after animation completes
      setTimeout(() => {
        setModalAnimationState('idle');
      }, 500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setFormData(prev => ({ ...prev, helpType: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      surname: '',
      cardNumber: '',
      email: '',
      helpType: '',
      comments: ''
    });
    setSelectedOption('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setWarningAnimationState('entering');
      setShowWarningModal(true);
      resetForm();
      
      setTimeout(() => {
        setWarningAnimationState('idle');
      }, 500);
    }, 500);
  };

  const closeWarningModal = () => {
    setWarningAnimationState('exiting');
    setTimeout(() => {
      setShowWarningModal(false);
      setWarningAnimationState('idle');
    }, 300);
  };

  // Animation helper functions
  const getElementAnimationStyle = (baseDelay: number, index: number = 0, isWarning: boolean = false) => {
    const animationState = isWarning ? warningAnimationState : modalAnimationState;
    const totalDelay = baseDelay + (index * 40); // Reduced stagger for faster animations
    
    if (animationState === 'entering') {
      return {
        opacity: 0,
        transform: 'translateY(8px)',
        animation: `elementFadeInUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${totalDelay}ms forwards`
      };
    }
    
    if (animationState === 'exiting') {
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

  // Optimized Reusable Components
  const InputField = ({ label, name, type = 'text', required = false, delay = 0 }: {
    label: string;
    name: keyof FormData;
    type?: string;
    required?: boolean;
    delay?: number;
  }) => (
    <div style={{
      willChange: 'transform, opacity',
      ...getElementAnimationStyle(delay)
    }}>
      <label className="screen-5-text" style={{
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 600,
        marginBottom: '0.3rem',
        color: 'var(--color-cream)',
        textAlign: 'left',
        width: '100%'
      }}>
        {label} {required && '*'}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        required={required}
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: '0.75rem',
          background: 'rgba(253, 252, 231, 0.15)',
          border: '1px solid rgba(253, 252, 231, 0.3)',
          borderRadius: '4px',
          color: 'var(--color-cream)',
          outline: 'none',
          textAlign: 'left',
          transition: 'all 0.2s ease'
        }}
        placeholder={label.toLowerCase()}
        onFocus={(e) => {
          e.target.style.background = 'rgba(253, 252, 231, 0.25)';
          e.target.style.borderColor = 'var(--color-cream)';
        }}
        onBlur={(e) => {
          e.target.style.background = 'rgba(253, 252, 231, 0.15)';
          e.target.style.borderColor = 'rgba(253, 252, 231, 0.3)';
        }}
      />
    </div>
  );

  const OptionButton = ({ option, index }: { option: FeedbackOption; index: number }) => (
    <div style={{
      willChange: 'transform, opacity',
      ...getElementAnimationStyle(200, index)
    }}>
      <button
        type="button"
        onClick={() => handleOptionSelect(option.value)}
        style={{
          width: '100%',
          padding: '0.6rem 0.4rem',
          fontSize: '0.7rem',
          fontWeight: 500,
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
          outline: 'none',
          background: selectedOption === option.value
            ? 'var(--color-cream)'
            : 'rgba(253, 252, 231, 0.15)',
          border: `1px solid ${selectedOption === option.value ? 'var(--color-cream)' : 'rgba(253, 252, 231, 0.3)'}`,
          color: selectedOption === option.value ? 'var(--color-orange)' : 'rgba(253, 252, 231, 0.7)',
          willChange: 'transform, background-color, border-color, color'
        }}
        onMouseEnter={(e) => {
          if (selectedOption !== option.value) {
            e.currentTarget.style.background = 'rgba(253, 252, 231, 0.25)';
            e.currentTarget.style.color = 'var(--color-cream)';
            e.currentTarget.style.borderColor = 'var(--color-cream)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={(e) => {
          if (selectedOption !== option.value) {
            e.currentTarget.style.background = 'rgba(253, 252, 231, 0.15)';
            e.currentTarget.style.color = 'rgba(253, 252, 231, 0.7)';
            e.currentTarget.style.borderColor = 'rgba(253, 252, 231, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        {option.label}
      </button>
    </div>
  );

  const textGridOpacity = isModalOpen ? 0 : 1;
  const mainContentOpacity = isModalOpen ? 0 : 1;

  return (
    <BaseScreen
      config={SCREEN_CONFIGS.feedback}
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
          className="screen-5-text"
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
        <p className="screen-5-text" style={{
          margin: '0 auto 1.5rem',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          fontWeight: 400,
          textAlign: 'center',
          opacity: 0.9,
          color: 'var(--color-cream)'
        }}>
          Your voice helps us serve God. If there's anything we can improve,
          refine, or strengthen in how we prepare and deliver our anniversaries,
          share it with us. Every message guides us toward what brings us joy.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleFeedbackClick}
            className="screen-5-text"
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
            Feedback
          </button>
        </div>
      </div>

      {/* Main Feedback Modal - FLAT on screen (no background/overlay) */}
      {isModalOpen && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '500px',
          padding: '0 1.5rem',
          zIndex: 10
        }}>
          {/* Modal Header - with optimized animation */}
          <div style={{ 
            marginBottom: '1.2rem', 
            textAlign: 'left',
            willChange: 'transform, opacity',
            ...getElementAnimationStyle(0)
          }}>
            <h3 className="screen-5-text" style={{ 
              fontSize: '1rem',
              fontWeight: 700,
              margin: '0 0 0.3rem',
              lineHeight: '1.3',
              color: 'var(--color-cream)'
            }}>
              Share Your Feedback
            </h3>
            <p className="screen-5-text" style={{ 
              fontSize: '0.75rem',
              margin: 0,
              opacity: 0.8,
              lineHeight: '1.4',
              color: 'rgba(253, 252, 231, 0.7)'
            }}>
              Help us improve by sharing your thoughts.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name & Surname */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
              <InputField label="Name" name="name" required delay={30} />
              <InputField label="Surname" name="surname" required delay={60} />
            </div>

            {/* Card & Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
              <InputField label="Card/Receipt Number" name="cardNumber" delay={90} />
              <InputField label="Email" name="email" type="email" required delay={120} />
            </div>

            {/* Feedback Options */}
            <div style={{ 
              marginBottom: '0.8rem',
              willChange: 'transform, opacity',
              ...getElementAnimationStyle(150)
            }}>
              <label className="screen-5-text" style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                marginBottom: '0.3rem',
                color: 'var(--color-cream)',
                textAlign: 'left',
                width: '100%'
              }}>
                Type of feedback *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {feedbackOptions.map((option, index) => (
                  <OptionButton key={option.value} option={option} index={index} />
                ))}
              </div>
              <div style={{ 
                fontSize: '0.7rem', 
                color: 'rgba(253, 252, 231, 0.5)', 
                marginTop: '0.3rem', 
                textAlign: 'left',
                willChange: 'transform, opacity',
                ...getElementAnimationStyle(350)
              }}>
                {selectedOption ? '✓ Selected' : 'Select one option'}
              </div>
            </div>

            <input type="hidden" name="helpType" value={formData.helpType} required />

            {/* Comments */}
            <div style={{ 
              marginBottom: '1rem',
              willChange: 'transform, opacity',
              ...getElementAnimationStyle(380)
            }}>
              <label className="screen-5-text" style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                marginBottom: '0.3rem',
                color: 'var(--color-cream)',
                textAlign: 'left',
                width: '100%'
              }}>
                Leave your comments
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  fontSize: '0.75rem',
                  background: 'rgba(253, 252, 231, 0.15)',
                  border: '1px solid rgba(253, 252, 231, 0.3)',
                  borderRadius: '4px',
                  color: 'var(--color-cream)',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '60px',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  willChange: 'transform'
                }}
                placeholder="comments..."
                onFocus={(e) => {
                  e.target.style.background = 'rgba(253, 252, 231, 0.25)';
                  e.target.style.borderColor = 'var(--color-cream)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(253, 252, 231, 0.15)';
                  e.target.style.borderColor = 'rgba(253, 252, 231, 0.3)';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            {/* Submit Button */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              willChange: 'transform, opacity',
              ...getElementAnimationStyle(420)
            }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontSize: '0.75rem',
                  background: 'rgba(253, 252, 231, 0.3)',
                  border: '1px solid rgba(253, 252, 231, 0.3)',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '4px',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: isSubmitting ? 0.7 : 1,
                  color: 'var(--color-cream)',
                  outline: 'none',
                  willChange: 'transform'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = 'rgba(253, 252, 231, 0.4)';
                    e.currentTarget.style.borderColor = 'var(--color-cream)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = 'rgba(253, 252, 231, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(253, 252, 231, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>

          {/* Close Button */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '1rem', 
            paddingTop: '1rem', 
            borderTop: '1px solid rgba(253, 252, 231, 0.1)',
            willChange: 'transform, opacity',
            ...getElementAnimationStyle(450)
          }}>
            <button
              onClick={handleFeedbackClick}
              className="screen-5-text"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'none',
                border: '1px solid rgba(253, 252, 231, 0.3)',
                color: 'var(--color-cream)',
                padding: '0.4rem 1rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
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

      {/* Warning Modal - HAS background but NO overlay - appears where form was */}
      {showWarningModal && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '350px',
          padding: '0 1.5rem',
          zIndex: 20,
          pointerEvents: 'auto'
        }}>
          <div style={{
            background: 'var(--color-orange)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            willChange: 'transform, opacity',
            ...getElementAnimationStyle(0, 0, true)
          }}>
            {/* Warning Icon */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '1rem',
              willChange: 'transform, opacity',
              ...getElementAnimationStyle(30, 0, true)
            }}>
              <IoIosWarning size={40} color="var(--color-cream)" />
            </div>

            {/* Warning Title */}
            <h3 className="screen-5-text" style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--color-cream)',
              marginBottom: '0.8rem',
              lineHeight: '1.3',
              willChange: 'transform, opacity',
              ...getElementAnimationStyle(60, 0, true)
            }}>
              Feedback for this platform will open after the Birthday Anniversary.
            </h3>

            {/* Warning Message */}
            <p className="screen-5-text" style={{
              fontSize: '0.8rem',
              color: 'rgba(253, 252, 231, 0.7)',
              lineHeight: '1.5',
              marginBottom: '1.5rem',
              willChange: 'transform, opacity',
              ...getElementAnimationStyle(90, 0, true)
            }}>
              Thank you for your patience and for walking with us as we prepare for the celebration.
            </p>

            {/* OK Button */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              willChange: 'transform, opacity',
              ...getElementAnimationStyle(120, 0, true)
            }}>
              <button
                onClick={closeWarningModal}
                className="screen-5-text"
                style={{
                  backgroundColor: 'rgba(253, 252, 231, 0.25)',
                  color: 'var(--color-cream)',
                  border: '1px solid rgba(253, 252, 231, 0.3)',
                  padding: '0.5rem 2rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  outline: 'none',
                  willChange: 'transform'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(253, 252, 231, 0.4)';
                  e.currentTarget.style.borderColor = 'var(--color-cream)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(253, 252, 231, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(253, 252, 231, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Optimized animation styles */}
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

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        input::placeholder,
        textarea::placeholder {
          color: rgba(253, 252, 231, 0.5) !important;
          opacity: 1 !important;
        }
        input::-webkit-input-placeholder,
        textarea::-webkit-input-placeholder {
          color: rgba(253, 252, 231, 0.5) !important;
        }
        input::-moz-placeholder,
        textarea::-moz-placeholder {
          color: rgba(253, 252, 231, 0.5) !important;
          opacity: 1 !important;
        }
        input:-ms-input-placeholder,
        textarea:-ms-input-placeholder {
          color: rgba(253, 252, 231, 0.5) !important;
        }
        input:-moz-placeholder,
        textarea:-moz-placeholder {
          color: rgba(253, 252, 231, 0.5) !important;
          opacity: 1 !important;
        }
      `}</style>
    </BaseScreen>
  );
};

export default FeedbackScreen;

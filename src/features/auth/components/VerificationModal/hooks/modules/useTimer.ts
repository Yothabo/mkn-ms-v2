import { useState, useEffect } from 'react';

interface UseTimerProps {
  step: string;
  shouldStop?: boolean;
}

export const useTimer = (step: string, shouldStop: boolean = false) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [expiryTime, setExpiryTime] = useState(0);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    console.log('Timer effect - step:', step, 'timeLeft:', timeLeft, 'isStopped:', isStopped, 'shouldStop:', shouldStop);
    
    // Start timer only when we have timeLeft > 0 and not stopped
    if (step === 'otp' && timeLeft > 0 && !isStopped && !shouldStop) {
      console.log('Starting timer with timeLeft:', timeLeft);
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsStopped(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [step, timeLeft, isStopped, shouldStop]);

  // Stop timer when shouldStop becomes true
  useEffect(() => {
    if (shouldStop && timeLeft > 0) {
      console.log('Stopping timer due to max attempts');
      setIsStopped(true);
      setTimeLeft(0);
    }
  }, [shouldStop, timeLeft]);

  // Reset stopped state when timeLeft is set to a new value (new OTP requested)
  useEffect(() => {
    if (timeLeft > 0 && isStopped) {
      console.log('New OTP requested, resetting stopped state');
      setIsStopped(false);
    }
  }, [timeLeft, isStopped]);

  const stopTimer = () => {
    console.log('Manual timer stop');
    setIsStopped(true);
    setTimeLeft(0);
  };

  const resetTimer = () => {
    console.log('Resetting timer state');
    setIsStopped(false);
    // Don't set timeLeft to 0 here - let the verification flow set it to the new expiry time
  };

  return {
    timeLeft,
    setTimeLeft,
    expiryTime,
    setExpiryTime,
    stopTimer,
    resetTimer
  };
};

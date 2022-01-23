import { useEffect, useState } from 'react';

export interface IUseTrackTimerProps {
  time: number;
  onTimeFinish?: (...args: any) => void;
}

export const useTrackTimer = ({ time, onTimeFinish }: IUseTrackTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(time);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft === 0) {
        if (onTimeFinish) {
          onTimeFinish();
        }

        clearInterval(interval);
        return;
      }

      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return {
    timeLeft,
  };
};

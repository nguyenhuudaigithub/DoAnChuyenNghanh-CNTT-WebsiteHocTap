import React, { useEffect, useState } from 'react';

const TimerTest = ({
  examData,
  calculateResult,
  selectedOptions,
}: {
  examData: any;
  calculateResult: any;
  selectedOptions: any;
}) => {
  const [timeTest, setTimeTest] = useState(examData?.duration || 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTest((prevTime: number) => {
        if (prevTime === 0) {
          clearInterval(timer);
          calculateResult();
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedOptions]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return <span>{formatTime(timeTest)}</span>;
};

export default TimerTest;

import React, { useRef } from 'react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';

function CountdownTimer({timeDuration, onTimeUp}) {
  const navigate = useNavigate();

  // Store target time in a ref so it persists across re-renders
  const countdownTarget = useRef(Date.now() + timeDuration * 1000); 

  // Called when timer completes
  // const handleSubmit = () => {
  //   alert("Time's Up!!!");
  //   navigate('/quiz/feedback');
  // };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-500">Time's up!</span>;
    } else {
      return (
        <span className="text-3xl font-bold text-white">
           {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      );
    }
  };

  return (
    <div className=" p-4 rounded text-right">
      <Countdown
        date={countdownTarget.current}
        renderer={renderer}
        onComplete={onTimeUp}
      />
    </div>
  );
}

export default CountdownTimer;

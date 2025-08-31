// import { useState } from 'react'

import { useEffect, useState, useRef } from "react"

const TimerDisplay = ({seconds}) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSecond = seconds % 60;

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  }

  return (
    <div className="timer-container">
      <div className="time-group">
        <span className="time-value">{formatTime(hours)}</span>
        <span className="time-label"> Hours</span>
      </div>
      <span className="separator">:</span>
      <div className="time-group">
        <span className="time-value">{formatTime(minutes)}</span>
        <span className="time-label"> Minutes</span>
      </div>
      <span className="separator">:</span>
      <div className="time-group">
        <span className="time-value" key={remainingSecond}>{formatTime(remainingSecond)}</span>
        <span className="time-label"> Seconds</span>
      </div>
    </div>
  );
}

const TimerControl = ({onToggle, isRunning, onReset, onReverse, isReversed}) => {
  return (
  <div className="button-group">
    <button onClick={onToggle} >{isRunning ? 'Stop' : 'Start'}</button>
    <button onClick={onReset} >Reset</button>
    <button onClick={onReverse}>{isReversed ? 'Go Forward' : 'Go Backward'}</button>
  </div>
  )
}

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef();

  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleTimer = () => {
    if (!isRunning && seconds === 0 && inputSeconds > 0) {
      setSeconds(inputSeconds);
    }
    setIsRunning(prevIsRunning => !prevIsRunning);
    setIsFinished(false);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
    setIsFinished(false);
  };

  const reverseTimer = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
    setIsRunning(false);
  }

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10)
    setInputSeconds(isNaN(value) ? 0 : value);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSecond => {

          if (isReversed) {

            if (prevSecond === 0) {
              setIsRunning(false);
              setIsFinished(true);
              return 0;
            }
            return prevSecond -1;
          } else {
            return prevSecond +1;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, isReversed]);

  return (
    <div className="neon-effect-container" style={{
      "--mouse-x": `${mousePosition.x}px`,
      "--mouse-y": `${mousePosition.y}px`
    }}>
      <div className="card" ref={cardRef}>
        <h1>Customizable Timer</h1>
        <div>
          <label htmlFor="">Set Timer (in seconds) : </label>
          <input type="number" value={inputSeconds} onChange={handleInputChange} />
        </div>
        <div className="timer-section">
          <TimerDisplay seconds={seconds}/>
          {isFinished && <h2 className="finish-message">FINISH!</h2>}
          <TimerControl onToggle={toggleTimer} onReset={resetTimer} onReverse={reverseTimer} isRunning={isRunning} isReversed={isReversed} />
        </div>
      </div>
    </div>
  )
};

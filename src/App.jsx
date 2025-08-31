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

const TimerControl = ({onToggle, isRunning, onReset, onReverse, isReversed, onAddTimestamps}) => {
  return (
  <div className="button-group">
    <button onClick={onToggle} >{isRunning ? 'Stop' : 'Start'}</button>
    <button onClick={onReset} >Reset</button>
    <button onClick={onReverse}>{isReversed ? 'Go Forward' : 'Go Backward'}</button>
    <button onClick={onAddTimestamps}>Time stamps</button>
  </div>
  )
}

const TimerInput = ({onSetTime,}) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] =useState('');

  const handleSetTimer = () => {
    const totalSeconds =  (parseInt(hours, 10) || 0) * 3600 +
                          (parseInt(minutes, 10) || 0) * 60 +
                          (parseInt(seconds, 10) || 0);
    onSetTime(totalSeconds);
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setter(value);
  };

  return (
    <div className="input-group">
      <div className="input-field">
        <label htmlFor="hours">Hours</label>
        <input type="text" id="hours" value={hours} onChange={handleInputChange(setHours)} maxLength="3" />
      </div>
      <div className="input-field">
        <label htmlFor="minutes">Minutes</label>
        <input type="text" id="minutes" value={minutes} onChange={handleInputChange(setMinutes)} maxLength="2" />
      </div>
      <div className="input-field">
        <label htmlFor="seconds">Seconds</label>
        <input type="text" id="seconds" value={seconds} onChange={handleInputChange(setSeconds)} maxLength="2" />
      </div>
      <button onClick={handleSetTimer} className="set-button">Set</button>
    </div>
  )

}

export default function App() {
  const [timestamps, setTimestamps] = useState([])
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

  const handleSetInputTime = (totalSeconds) => {
    setInputSeconds(totalSeconds);
    setSeconds(totalSeconds);
    setIsFinished(false)
  }

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

  const addTimestamp = () => {
    if (isRunning) {
      setTimestamps(prevTimestamps => [...prevTimestamps, seconds])
    }
  };

  const clearTimestamps = () => {
    setTimestamps([]);
  }

  return (
    <div className="neon-effect-container" style={{
      "--mouse-x": `${mousePosition.x}px`,
      "--mouse-y": `${mousePosition.y}px`
    }}>
      <div className="card" ref={cardRef}>
        <h1>Customizable Timer</h1>
        <TimerInput onSetTime={handleSetInputTime} />
        <div className="timer-section">
          <TimerDisplay seconds={seconds}/>
          {isFinished && <h2 className="finish-message">FINISH!</h2>}
          <TimerControl onToggle={toggleTimer} onReset={resetTimer} onReverse={reverseTimer} isRunning={isRunning} isReversed={isReversed} onAddTimestamps={addTimestamp}/>
        </div>
        <div className="timestamps-container">
          <h3>Time stamps</h3>
          <ul>
            {timestamps.map((ts, index) => {
              const hours = Math.floor(ts / 3600);
              const minutes = Math.floor((ts % 3600) / 60);
              const remainingSeconds = ts % 60;

              const formatTime = (time) => time < 10 ? `0${time}` : time;

              return (
                <li key={index}>
                  <span className="timestamp-label">Timestamp {index + 1}:</span>
                  <span className="timestamp-value">
                    {formatTime(hours)}:{formatTime(minutes)}:{formatTime(remainingSeconds)}
                  </span>
                </li>
              );
            })}
          </ul>
          {timestamps.length > 0 && (
            <button className="clear-button" onClick={clearTimestamps}>Clear All</button>
          )}
        </div>
      </div>
    </div>
  )
};

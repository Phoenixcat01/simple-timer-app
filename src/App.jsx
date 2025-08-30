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
    <h1>
      {formatTime(hours)}:{formatTime(minutes)}:{formatTime(remainingSecond)}
    </h1>
  );
}

const TimerControl = ({onToggle, isRunning, onReset, onReverse, isReversed}) => {
  return (
  <>
    <button onClick={onToggle} >{isRunning ? 'Stop' : 'Start'}</button>
    <button onClick={onReset} >Reset</button>
    <button onClick={onReverse}>{isReversed ? 'Go Forward' : 'Go Backward'}</button>
  </>
  )
}

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef();

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
    <>
      <h1>Customizable TImer</h1>
      <div>
        <label htmlFor="">Set TImer (in seconds) : </label>
        <input type="number" value={inputSeconds} onChange={handleInputChange} />
      </div>
      <div>
        <TimerDisplay seconds={seconds}/>
        {isFinished && <h2>FINISH!</h2>}
        <TimerControl onToggle={toggleTimer} onReset={resetTimer} onReverse={reverseTimer} isRunning={isRunning} isReversed={isReversed} />
      </div>
    </>
  )
};

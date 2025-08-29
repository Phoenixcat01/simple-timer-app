// import { useState } from 'react'

import { useEffect, useState } from "react"

const TimerDisplay = ({second}) => {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  const remainingSecond = second % 60;

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

  const toggleTimer = () => {
    setIsRunning(prevIsRunning => !prevIsRunning)
  };

  const resetTimer = () => {
    setSeconds(0); setIsRunning(false);
  };

  const reverseTimer = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
    setIsRunning(false);
  }

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        if (isReversed) {
          if (seconds === 0) {
            setIsRunning(false);
          } else {
            setSeconds(prevSecond => prevSecond - 1)
          }
        } else {
          setSeconds(prevSecond => prevSecond + 1);
        }
      },1000);
    }
    return () => clearInterval(intervalId)
  }, [isRunning, isReversed, seconds]);

  return (
    <>
      <div>
        <TimerDisplay second={seconds}/>
        <TimerControl onToggle={toggleTimer} onReset={resetTimer} onReverse={reverseTimer} isRunning={isRunning} isReversed={isReversed} />
      </div>
    </>
  )
};

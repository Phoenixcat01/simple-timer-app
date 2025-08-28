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

const TimerControl = (props) => {
  return (
  <>
    <button onClick={props.onToggle} >{props.isRunning ? 'Stop' : 'Start'}</button>
    <button onClick={props.onReset} >Reset</button>
  </>
  )
}

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const toggleTimer = () => {
    setIsRunning(prevIsRunning => !prevIsRunning)
  };

  const resetTimer = () => {
    setSeconds(0); setIsRunning(false);
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      },1000);
    }
    return () => clearInterval(intervalId)
  }, [isRunning])

  return (
    <>
      <div>
        <TimerDisplay second={seconds}/>
        <TimerControl onToggle={toggleTimer} onReset={resetTimer} isRunning={isRunning} />
      </div>
    </>
  )
};

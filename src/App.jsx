// import { useState } from 'react'

import { useEffect, useState } from "react"

const TimerDisplay = (props) => {
  return <h1>{props.second}</h1>
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

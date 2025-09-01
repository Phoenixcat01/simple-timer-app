import { useEffect, useState, useRef } from "react"

/**
 * TimerDisplay component to format and show the time in HH:MM:SS format.
 * @param {object} props - The component props.
 * @param {number} props.seconds - The total number of seconds to display.
 */
const TimerDisplay = ({seconds}) => {
  // Calculate hours, minutes, and remaining seconds from the total seconds.
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSecond = seconds % 60;

  /**
   * Helper function to format a number, adding a leading zero if it's less than 10.
   * @param {number} time - The number to format.
   * @returns {string} The formatted time string.
   */
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  }

  return (
    <div className="timer-container">
      {/* Display hours */}
      <div className="time-group">
        <span className="time-value">{formatTime(hours)}</span>
        <span className="time-label"> Hours</span>
      </div>
      <span className="separator">:</span>
      {/* Display minutes */}
      <div className="time-group">
        <span className="time-value">{formatTime(minutes)}</span>
        <span className="time-label"> Minutes</span>
      </div>
      <span className="separator">:</span>
      {/* Display seconds with a unique key for animation */}
      <div className="time-group">
        <span className="time-value" key={remainingSecond}>{formatTime(remainingSecond)}</span>
        <span className="time-label"> Seconds</span>
      </div>
    </div>
  );
}

/**
 * TimerArrow component to display a directional arrow based on timer mode.
 * The arrow points left for reverse mode and right for forward.
 * @param {object} props - The component props.
 * @param {boolean} props.isReversed - Indicates if the timer is in reverse mode.
 */
const TimerArrow = ({ isReversed }) => {
  return (
    <div className="arrow-container">
      <span className={`arrow ${isReversed ? 'backward' : 'forward'}`}>
        ⮜
      </span>
    </div>
  );
}

/**
 * TimerControl component for controlling timer actions (Start/Stop, Reset, Reverse, Timestamp).
 * @param {object} props - The component props.
 * @param {function} props.onToggle - Function to start or stop the timer.
 * @param {boolean} props.isRunning - Indicates if the timer is currently running.
 * @param {function} props.onReset - Function to reset the timer.
 * @param {function} props.onReverse - Function to toggle the timer direction.
 * @param {boolean} props.isReversed - Indicates if the timer is in reverse mode.
 * @param {function} props.onAddTimestamps - Function to add a timestamp.
 */
const TimerControl = ({onToggle, isRunning, onReset, onReverse, isReversed, onAddTimestamps}) => {
  return (
  <div className="button-group">
    <button onClick={onToggle} >{isRunning ? 'Stop' : 'Start'}</button>
    <button onClick={onReset} >Reset</button>
    <button onClick={onReverse} style={{"minWidth":'140px'}}>{isReversed ? 'Go Forward' : 'Go Backward'}</button>
    <button onClick={onAddTimestamps}>Time stamps</button>
  </div>
  )
}

/**
 * TimerInput component to set the timer's initial time.
 * @param {object} props - The component props.
 * @param {function} props.onSetTime - Callback function to set the total seconds.
 */
const TimerInput = ({onSetTime,}) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] =useState('');

  // Converts input values to total seconds and calls the parent's onSetTime function.
  const handleSetTimer = () => {
    const totalSeconds =  (parseInt(hours, 10) || 0) * 3600 +
                          (parseInt(minutes, 10) || 0) * 60 +
                          (parseInt(seconds, 10) || 0);
    onSetTime(totalSeconds);
  };

  /**
   * Handles input changes, ensuring only numeric values are accepted.
   * @param {function} setter - The state setter function for the specific input.
   * @returns {function} The event handler function.
   */
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

/**
 * Guide component to display a user guide in a modal.
 * @param {object} props - The component props.
 * @param {function} props.onClose - Callback function to close the modal.
 */
const Guide = ({onClose}) => {
  return (
    <div className="guide-modal-overlay">
      <div className="guide-modal-content">
        <h2>Timer Usage Guide</h2>
        <p>This app is a versatile custom timer. Here’s how to use it:</p>
        <div className="guide-item">
          <h4>1. Set the Time</h4>
          <p>Enter the hours, minutes, or seconds you want in the input field, then click the **"Set"** button to apply the time.</p>
        </div>

        <div className="guide-item">
          <h4>2. Start/Stop Timer</h4>
          <p>The **"Start"** button will begin counting forward. Click the same button (which changes to **"Stop"**) to pause it.</p>
        </div>

        <div className="guide-item">
          <h4>3. Forward & Backward Mode</h4>
          <p>Use the **"Go Forward"** or **"Go Backward"** buttons to switch between forward and backward counting. The arrow in the middle will indicate the direction.</p>
        </div>

        <div className="guide-item">
          <h4>4. Record Important Moments</h4>
          <p>While the timer is running, click the **"Time stamps"** button to record the current time. All records will appear below.</p>
        </div>

        <div className="guide-item">
          <h4>5. Reset & Clear</h4>
          <p>The **"Reset"** button will return the timer to zero. If there are recorded times, the **"Clear All"** button will appear to delete them.</p>
        </div>

        <button className="guide-close-button" onClick={onClose}>Tutup</button>
      </div>
    </div>
  )
}

/**
 * The main App component that manages the timer's state and logic.
 */
export default function App() {
  // State for managing application data
  const [timestamps, setTimestamps] = useState([])
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // useRef to hold the interval ID without triggering re-renders
  const intervalRef = useRef();

  // State and ref for the hover effect
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const cardRef = useRef(null);

  /**
   * Tracks the mouse position relative to the card for the hover effect.
   * @param {MouseEvent} e - The mouse move event.
   */
  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Effect to add and clean up the mouse move event listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  /**
   * Sets the initial timer value from the input.
   * @param {number} totalSeconds - The total seconds from the input fields.
   */
  const handleSetInputTime = (totalSeconds) => {
    setInputSeconds(totalSeconds);
    setSeconds(totalSeconds);
    setIsFinished(false)
  }

  // Toggles the timer between running and stopped states.
  const toggleTimer = () => {
    if (!isRunning && seconds === 0 && inputSeconds > 0) {
      setSeconds(inputSeconds);
    }
    setIsRunning(prevIsRunning => !prevIsRunning);
    setIsFinished(false);
  };

  // Resets the timer to zero and stops it.
  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
    setIsFinished(false);
  };

  // Toggles the timer direction (forward/backward) and stops the timer.
  const reverseTimer = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
    setIsRunning(false);
  }

  // Effect to handle the timer interval logic.
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSecond => {

          if (isReversed) {
            // Count down logic
            if (prevSecond === 0) {
              setIsRunning(false);
              setIsFinished(true);
              return 0;
            }
            return prevSecond -1;
          } else {
            // Count up logic
            return prevSecond +1;
          }
        });
      }, 1000);
    }

    // Cleanup function to clear the interval when the component unmounts or dependencies change.
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, isReversed]);

  // Adds the current timer value to the timestamps list.
  const addTimestamp = () => {
    if (isRunning) {
      setTimestamps(prevTimestamps => [...prevTimestamps, seconds])
    }
  };

  // Clears all saved timestamps.
  const clearTimestamps = () => {
    setTimestamps([]);
  }

  return (
    <div className="neon-effect-container" style={{
      "--mouse-x": `${mousePosition.x}px`,
      "--mouse-y": `${mousePosition.y}px`
    }}>
      {/* Button to show the guide modal */}
      <button className="info-button" onClick={() => setShowGuide(true)}>?</button>

      <div className="card" ref={cardRef}>
        <h1>Customizable Timer</h1>
        <TimerInput onSetTime={handleSetInputTime} />
        <div className="timer-section">
          <TimerDisplay seconds={seconds}/>
          <TimerArrow isReversed={isReversed}/>
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
      {/* Render the guide modal if showGuide is true */}
      {showGuide && <Guide onClose={() => setShowGuide(false)} />}
    </div>
  )
};

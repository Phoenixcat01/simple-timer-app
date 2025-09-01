import { useEffect, useState, useRef } from "react";

// Import components from their new files
import TimerDisplay from "./components/TimerDisplay";
import TimerControl from "./components/TimerControl";
import TimerInput from "./components/TimerInput";
import TimerArrow from "./components/TimerArrow";
import Guide from "./components/Guide";
import Timestamps from "./components/Timestamps";

/**
 * The main App component that manages the timer's state and logic.
 */
export default function App() {
    // State for managing application data
    const [timestamps, setTimestamps] = useState([]);
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
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    /**
     * Sets the initial timer value from the input.
     * @param {number} totalSeconds - The total seconds from the input fields.
     */
    const handleSetInputTime = (totalSeconds) => {
        setInputSeconds(totalSeconds);
        setSeconds(totalSeconds);
        setIsFinished(false);
    };

    // Toggles the timer between running and stopped states.
    const toggleTimer = () => {
        if (!isRunning && seconds === 0 && inputSeconds > 0) {
            setSeconds(inputSeconds);
        }
        setIsRunning((prevIsRunning) => !prevIsRunning);
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
        setIsReversed((prevIsReversed) => !prevIsReversed);
        setIsRunning(false);
    };

    // Effect to handle the timer interval logic.
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds((prevSecond) => {
                    if (isReversed) {
                        // Count down logic
                        if (prevSecond === 0) {
                            setIsRunning(false);
                            setIsFinished(true);
                            return 0;
                        }
                        return prevSecond - 1;
                    } else {
                        // Count up logic
                        return prevSecond + 1;
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
            setTimestamps((prevTimestamps) => [...prevTimestamps, seconds]);
        }
    };

    // Clears all saved timestamps.
    const clearTimestamps = () => {
        setTimestamps([]);
    };

    return (
        <div
            className="neon-effect-container"
            style={{
                "--mouse-x": `${mousePosition.x}px`,
                "--mouse-y": `${mousePosition.y}px`,
            }}
        >
            {/* Button to show the guide modal */}
            <button className="info-button" onClick={() => setShowGuide(true)}>
                ?
            </button>

            <div className="card" ref={cardRef}>
                <h1>Customizable Timer</h1>
                <TimerInput onSetTime={handleSetInputTime} />
                <div className="timer-section">
                    <TimerDisplay seconds={seconds} />
                    <TimerArrow isReversed={isReversed} />
                    {isFinished && <h2 className="finish-message">FINISH!</h2>}
                    <TimerControl
                        onToggle={toggleTimer}
                        onReset={resetTimer}
                        onReverse={reverseTimer}
                        isRunning={isRunning}
                        isReversed={isReversed}
                        onAddTimestamps={addTimestamp}
                    />
                </div>
                <Timestamps timestamps={timestamps} onClear={clearTimestamps} />
            </div>
            {/* Render the guide modal if showGuide is true */}
            {showGuide && <Guide onClose={() => setShowGuide(false)} />}
        </div>
    );
}

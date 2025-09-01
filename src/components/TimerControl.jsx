import "./styles/TimerControl.css";

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
const TimerControl = ({
    onToggle,
    isRunning,
    onReset,
    onReverse,
    isReversed,
    onAddTimestamps,
}) => {
    return (
        <div className="button-group">
            <button onClick={onToggle}>{isRunning ? "Stop" : "Start"}</button>
            <button onClick={onReset}>Reset</button>
            <button onClick={onReverse} style={{ minWidth: "140px" }}>
                {isReversed ? "Go Forward" : "Go Backward"}
            </button>
            <button onClick={onAddTimestamps}>Time stamps</button>
        </div>
    );
};

export default TimerControl;

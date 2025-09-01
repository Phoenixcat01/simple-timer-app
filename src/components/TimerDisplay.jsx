import "./styles/TimerDisplay.css";

/**
 * TimerDisplay component to format and show the time in HH:MM:SS format.
 * @param {object} props - The component props.
 * @param {number} props.seconds - The total number of seconds to display.
 */
const TimerDisplay = ({ seconds }) => {
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
    };

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
                <span className="time-value" key={remainingSecond}>
                    {formatTime(remainingSecond)}
                </span>
                <span className="time-label"> Seconds</span>
            </div>
        </div>
    );
};

export default TimerDisplay;

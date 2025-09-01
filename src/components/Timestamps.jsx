import "./styles/Timestamps.css";

/**
 * Timestamps component to display a list of recorded timestamps.
 * @param {object} props - The component props.
 * @param {number[]} props.timestamps - An array of timestamps in seconds.
 * @param {function} props.onClear - Callback function to clear all timestamps.
 */
const Timestamps = ({ timestamps, onClear }) => {
    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    return (
        <div className="timestamps-container">
            <h3>Time stamps</h3>
            <ul>
                {timestamps.map((ts, index) => {
                    const hours = Math.floor(ts / 3600);
                    const minutes = Math.floor((ts % 3600) / 60);
                    const remainingSeconds = ts % 60;

                    return (
                        <li key={index}>
                            <span className="timestamp-label">
                                Timestamp {index + 1}:
                            </span>
                            <span className="timestamp-value">
                                {formatTime(hours)}:{formatTime(minutes)}:
                                {formatTime(remainingSeconds)}
                            </span>
                        </li>
                    );
                })}
            </ul>
            {timestamps.length > 0 && (
                <button className="clear-button" onClick={onClear}>
                    Clear All
                </button>
            )}
        </div>
    );
};

export default Timestamps;

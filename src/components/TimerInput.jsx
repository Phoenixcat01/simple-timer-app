import { useState } from "react";
import "./styles/TimerInput.css";

/**
 * TimerInput component to set the timer's initial time.
 * @param {object} props - The component props.
 * @param {function} props.onSetTime - Callback function to set the total seconds.
 */
const TimerInput = ({ onSetTime }) => {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");

    // Converts input values to total seconds and calls the parent's onSetTime function.
    const handleSetTimer = () => {
        const totalSeconds =
            (parseInt(hours, 10) || 0) * 3600 +
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
        const value = e.target.value.replace(/[^0-9]/g, "");
        setter(value);
    };

    return (
        <div className="input-group">
            <div className="input-field">
                <label htmlFor="hours">Hours</label>
                <input
                    type="text"
                    id="hours"
                    value={hours}
                    onChange={handleInputChange(setHours)}
                    maxLength="3"
                />
            </div>
            <div className="input-field">
                <label htmlFor="minutes">Minutes</label>
                <input
                    type="text"
                    id="minutes"
                    value={minutes}
                    onChange={handleInputChange(setMinutes)}
                    maxLength="2"
                />
            </div>
            <div className="input-field">
                <label htmlFor="seconds">Seconds</label>
                <input
                    type="text"
                    id="seconds"
                    value={seconds}
                    onChange={handleInputChange(setSeconds)}
                    maxLength="2"
                />
            </div>
            <button onClick={handleSetTimer} className="set-button">
                Set
            </button>
        </div>
    );
};

export default TimerInput;

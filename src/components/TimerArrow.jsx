import "./styles/TimerArrow.css";

/**
 * TimerArrow component to display a directional arrow based on timer mode.
 * The arrow points left for reverse mode and right for forward.
 * @param {object} props - The component props.
 * @param {boolean} props.isReversed - Indicates if the timer is in reverse mode.
 */
const TimerArrow = ({ isReversed }) => {
    return (
        <div className="arrow-container">
            <span className={`arrow ${isReversed ? "backward" : "forward"}`}>
                ⮜
            </span>
        </div>
    );
};

export default TimerArrow;

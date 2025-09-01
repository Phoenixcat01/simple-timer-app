import "./styles/Guide.css";

/**
 * Guide component to display a user guide in a modal.
 * @param {object} props - The component props.
 * @param {function} props.onClose - Callback function to close the modal.
 */
const Guide = ({ onClose }) => {
    return (
        <div className="guide-modal-overlay">
            <div className="guide-modal-content">
                <h2>Timer Usage Guide</h2>
                <p>
                    This app is a versatile custom timer. Here’s how to use it:
                </p>
                <div className="guide-item">
                    <h4>1. Set the Time</h4>
                    <p>
                        Enter the hours, minutes, or seconds you want in the
                        input field, then click the **"Set"** button to apply
                        the time.
                    </p>
                </div>

                <div className="guide-item">
                    <h4>2. Start/Stop Timer</h4>
                    <p>
                        The **"Start"** button will begin counting forward.
                        Click the same button (which changes to **"Stop"**) to
                        pause it.
                    </p>
                </div>

                <div className="guide-item">
                    <h4>3. Forward & Backward Mode</h4>
                    <p>
                        Use the **"Go Forward"** or **"Go Backward"** buttons to
                        switch between forward and backward counting. The arrow
                        in the middle will indicate the direction.
                    </p>
                </div>

                <div className="guide-item">
                    <h4>4. Record Important Moments</h4>
                    <p>
                        While the timer is running, click the **"Time stamps"**
                        button to record the current time. All records will
                        appear below.
                    </p>
                </div>

                <div className="guide-item">
                    <h4>5. Reset & Clear</h4>
                    <p>
                        The **"Reset"** button will return the timer to zero. If
                        there are recorded times, the **"Clear All"** button
                        will appear to delete them.
                    </p>
                </div>

                <button className="guide-close-button" onClick={onClose}>
                    Tutup
                </button>
            </div>
        </div>
    );
};

export default Guide;

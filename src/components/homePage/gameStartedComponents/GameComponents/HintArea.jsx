import {useEffect, useState} from 'react';
import '../../../../css/HintArea.css';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import styles from "../../../../css/App.module.css"; // Import the CSS for styling

const HintArea = ({hint}) => {
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        if (hint) {
            setBlink(true); // Trigger the blink animation
            const timer = setTimeout(() => setBlink(false), 2000); // Stop blinking after 2 seconds (2 blinks)
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [hint]);

    return hint && (
        <OverlayTrigger
            key={"top"}
            placement={"top"}
            overlay={
                <Tooltip id={`tooltip`} style={{fontSize:"1rem"}}>
                    {`Hint : ${hint}`}
                </Tooltip>
            }
        >
            <div className={`hint-area ${blink ? "blink" : ""}`}>
                <img src="public/hint.svg" className={`hint-img`} alt=""/>
            </div>
        </OverlayTrigger>
    );
};

export default HintArea;

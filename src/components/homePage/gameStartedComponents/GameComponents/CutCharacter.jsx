
import styles from "../../../../css/App.module.css";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


const CutCharacter = ({ ch,guess }) => {


    return (<OverlayTrigger
        key={"top"}
        placement={"top"}
        overlay={
            <Tooltip id={`tooltip`}>
                {guess+" "}
            </Tooltip>
        }
        show={true}
    >
        <span className={styles.cutB}>{ch}</span>
    </OverlayTrigger>);
};

export default CutCharacter;
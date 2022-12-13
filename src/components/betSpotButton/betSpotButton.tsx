import {FC, memo} from "react";
import {BetSpot} from "../../assets/types";
import styles from "./betSpotButton.module.scss";
import {Chip} from "../index";

interface BetSpotButtonProp {
    type: BetSpot;
    bet: number;
    onClick: (betSpot: BetSpot) => void;
    isWin: boolean;
}

const BetSpotButton: FC<BetSpotButtonProp> = memo(({type, bet, onClick, isWin}) => {
    return (
        <button
            className={`${styles.button} ${styles[`button_${type.toLowerCase()}`]} ${isWin ? styles.button_win : ""}`}
            onClick={() => onClick(type)}
        >
            {!!bet && <Chip bet={bet} />}
            <div className={styles.button__title}>{type.toUpperCase()}</div>
        </button>
    );
});

export {BetSpotButton};

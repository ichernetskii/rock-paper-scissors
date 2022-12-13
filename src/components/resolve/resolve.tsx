import React, {FC, memo} from "react";
import { BetSpot } from "../../assets/types";
import styles from "./resolve.module.scss";

interface ResolveProps {
    winningBetSpot?: BetSpot;
    winAmount?: number;
    isTie: boolean;
}

export const Resolve: FC<ResolveProps> = memo(({winAmount, isTie, winningBetSpot = ""}) => (
    <>
        <div className={`${styles.won} ${styles[`won_${winningBetSpot.toLowerCase()}`]}`}>
            {winningBetSpot?.toUpperCase()} {isTie ? "TIE" : "WON"}
        </div>
        {
            !!winAmount && (
                <div className={styles.youWin}>
                    YOU WIN
                    <span className={styles.winAmount}>{winAmount}</span>
                </div>
            )
        }
    </>
));

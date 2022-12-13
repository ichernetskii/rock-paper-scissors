import React, {FC, memo} from "react";
import styles from "./result.module.scss";

interface ResultProps {
    computer?: string;
    player?: string;
}

export const Result: FC<ResultProps> = memo(({computer, player}) => (
    <div className={styles.result}>
        <span className={styles.opponent}>{computer}</span>
        <span className={styles.vs}>vs</span>
        <span className={styles.opponent}>{player}</span>
    </div>
));

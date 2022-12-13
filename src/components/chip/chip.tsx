import {FC, memo} from "react";
import styles from "./chip.module.scss";

const Chip: FC<{bet: number}> = memo(({bet}) => (
    <div className={styles.chip}>
        <div className={styles.chip__height}>
            <span className={styles.chip__bet}>{bet}</span>
        </div>
    </div>
));

export {Chip};

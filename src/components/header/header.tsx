import {FC, memo} from "react";
import styles from "./header.module.scss";

interface HeaderProps {
    balance: number;
    bet: number;
    win: number;
}

const HeaderItem: FC<{data: string; value: string;}> = ({data, value}) => (
    <div className={styles.headerItem}>
        <span className={styles.headerItem_key}>{`${data}: `}</span>
        <span className={styles.headerItem_value}>{value}</span>
    </div>
)

const Header: FC<HeaderProps> = memo(({balance, bet, win}) => (
    <header className={styles.header}>
        <HeaderItem data="BALANCE" value={balance.toString()} />
        <HeaderItem data="BET" value={bet.toString()} />
        <HeaderItem data="WIN" value={win.toString()} />
    </header>
));

export {Header};
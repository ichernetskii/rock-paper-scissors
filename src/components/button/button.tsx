import {FC, memo} from "react";
import styles from "./button.module.scss";

interface ButtonProp {
    text: string;
    disabled: boolean;
    onClick: () => void;
}

export const Button: FC<ButtonProp> = memo(({text, onClick, disabled}) => (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
        {text}
    </button>
));

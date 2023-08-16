import { Circle } from "shared/ui";
import { useState, ChangeEvent, FC, KeyboardEvent } from "react";
import cx from "classnames";

import carbonSvg from "assets/svgs/carbon.svg";
import styles from "./styles.module.scss";

interface IChatInput {
    inputMessageDisabled: boolean;
    setInputtedMessageState: (msg: string, isDisabled: boolean) => void;
}
const ChatInput: FC<IChatInput> = ({ inputMessageDisabled, setInputtedMessageState }) => {
    const [inputValue, setInputValue] = useState("");
    const onSetMessage = () => {
        if (inputValue) {
            setInputtedMessageState(inputValue, true);
            setInputValue("");
        }
    };

    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSetMessage();
        }
    };
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className={styles.container}>
            <input
                value={inputValue}
                onChange={onInputChange}
                placeholder={"Start typing here..."}
                className={cx(styles.input, inputMessageDisabled && styles.disabled)}
                onKeyDown={onInputKeyDown}
                disabled={inputMessageDisabled}
            />
            <Circle
                alt={"carbon"}
                src={carbonSvg}
                className={cx(
                    styles.circle,
                    !inputValue && inputMessageDisabled && styles.disabled
                )}
                onClick={onSetMessage}
            />
        </div>
    );
};
export default ChatInput;

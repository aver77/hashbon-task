import { Circle } from "shared/ui";
import { useState, ChangeEvent, FC, KeyboardEvent } from "react";

import carbonSvg from "assets/svgs/carbon.svg";
import styles from "./styles.module.scss";

interface IChatInput {
    setInputtedMessage: (msg: string) => void;
}
const ChatInput: FC<IChatInput> = ({ setInputtedMessage }) => {
    const [inputValue, setInputValue] = useState("");
    const onSetMessage = () => {
        if (inputValue) {
            setInputtedMessage(inputValue);
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
                className={styles.input}
                onKeyDown={onInputKeyDown}
            />
            <Circle
                alt={"carbon"}
                src={carbonSvg}
                className={styles.circle}
                onClick={onSetMessage}
            />
        </div>
    );
};
export default ChatInput;

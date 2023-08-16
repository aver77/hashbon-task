import { Header } from "shared/components";
import { ChatWindow, ChatInput } from "./components";

import styles from "./styles.module.scss";
import { useState } from "react";
const ChatModule = () => {
    const [inputtedMessage, setInputtedMessage] = useState("");
    const [inputMessageDisabled, setInputMessageDisabled] = useState(false);

    const setInputtedMessageState = (msg: string, isDisabled: boolean) => {
        setInputtedMessage(msg);
        setInputMessageDisabled(isDisabled);
    };

    return (
        <div className={styles.container}>
            <Header />
            <ChatWindow
                inputtedMessage={inputtedMessage}
                setInputtedMessageState={setInputtedMessageState}
            />
            <ChatInput
                inputMessageDisabled={inputMessageDisabled}
                setInputtedMessageState={setInputtedMessageState}
            />
        </div>
    );
};
export default ChatModule;

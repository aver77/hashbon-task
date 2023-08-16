import { Header } from "shared/components";
import { ChatWindow, ChatInput } from "./components";

import styles from "./styles.module.scss";
import { useState } from "react";
const ChatModule = () => {
    const [inputtedMessage, setInputtedMessage] = useState("");

    return (
        <div className={styles.container}>
            <Header />
            <ChatWindow inputtedMessage={inputtedMessage} setInputtedMessage={setInputtedMessage} />
            <ChatInput setInputtedMessage={setInputtedMessage} />
        </div>
    );
};
export default ChatModule;

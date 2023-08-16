import styles from "./styles.module.scss";
import Message from "./message";
import { MessageType } from "shared/models/enums";
import { FC, useEffect, useRef, useState } from "react";
import scrollToRef from "shared/utils/scrollToRef";
import { IMessage } from "shared/models/interfaces";
import MessageService from "shared/http/MessageService";

interface IChatWindow {
    inputtedMessage: string;
    setInputtedMessage: (msg: string) => void;
}
const ChatWindow: FC<IChatWindow> = ({ inputtedMessage, setInputtedMessage }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    //handle my messages
    useEffect(() => {
        if (inputtedMessage) {
            setMessages((prev) => [...prev, { msg: inputtedMessage, msgType: MessageType.MINE }]);
        }

        setInputtedMessage("");

        scrollToRef(messagesEndRef.current, {
            behavior: "smooth"
        });
    }, [inputtedMessage]);

    return (
        <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
                {messages.map(({ msg, msgType }, index) => (
                    <Message key={"_" + index + msg} msg={msg} msgType={msgType} />
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};
export default ChatWindow;

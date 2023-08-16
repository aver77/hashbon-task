import styles from "./styles.module.scss";
import Message from "./message";
import { MessageType } from "shared/models/enums";
import { FC, useEffect, useRef, useState } from "react";
import scrollToRef from "shared/utils/scrollToRef";
import { IMessage } from "shared/models/interfaces";
import MessageService from "shared/http/MessageService";
import parseChunks from "shared/utils/parseChunks";

interface IChatWindow {
    inputtedMessage: string;
    setInputtedMessageState: (msg: string, isDisabled: boolean) => void;
}
const ChatWindow: FC<IChatWindow> = ({ inputtedMessage, setInputtedMessageState }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (inputtedMessage) {
            const updatedMessages = [
                ...messages,
                { msg: inputtedMessage, msgType: MessageType.MINE }
            ];
            setMessages(updatedMessages);
            scrollToRef(messagesEndRef.current, {
                behavior: "smooth"
            });

            MessageService.sendMessage(inputtedMessage)
                .then((data) => {
                    setMessages([
                        ...updatedMessages,
                        { msg: parseChunks(data), msgType: MessageType.BOT }
                    ]);

                    setInputtedMessageState("", false);

                    scrollToRef(messagesEndRef.current, {
                        behavior: "smooth"
                    });
                })
                .catch((e) => console.log(e));
        }
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

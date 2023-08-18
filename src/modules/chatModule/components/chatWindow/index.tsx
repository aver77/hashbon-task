import styles from "./styles.module.scss";
import Message from "./message";
import { MessageType } from "shared/models/enums";
import { FC, useEffect, useRef, useState } from "react";
import scrollToRef from "shared/utils/scrollToRef";
import { IMessage } from "shared/models/interfaces";
import MessageService from "shared/http/MessageService";
import { sleep } from "shared/utils/sleep";
import { SEPARATOR, AMOUNT_OF_MESSAGES_TO_STORE } from "./constants";

interface IChatWindow {
    inputtedMessage: string;
    setInputtedMessageState: (msg: string, isDisabled: boolean) => void;
}
const ChatWindow: FC<IChatWindow> = ({ inputtedMessage, setInputtedMessageState }) => {
    const storageMessages: IMessage[] = JSON.parse(localStorage.getItem("messages") ?? "[]");

    const [messages, setMessages] = useState<IMessage[]>(storageMessages);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        scrollToRef(messagesEndRef.current, {
            behavior: "smooth"
        });
    }, []);

    useEffect(() => {
        const handleBotMessageStream = async () => {
            try {
                const botMessage = await MessageService.sendMessage(inputtedMessage);

                if (!botMessage?.body) {
                    return;
                }

                const reader = botMessage.body.getReader();

                let readerText = "";

                for (;;) {
                    const { done, value } = await reader.read();

                    if (done) {
                        return;
                    }

                    readerText += new TextDecoder().decode(value);

                    const chunks = readerText.split(SEPARATOR);

                    for (let chunk of chunks) {
                        if (chunk) {
                            const modifiedChunk = chunk.includes(SEPARATOR)
                                ? chunk
                                : chunk + SEPARATOR;

                            const chunkData = JSON.parse(modifiedChunk);

                            if (chunkData.status === "content") {
                                setMessages((prevMessages) => {
                                    const { msgType: lastMessageMsgType, msg: lastMessageMsg } =
                                        prevMessages.slice(-1)[0];

                                    const newMessages =
                                        lastMessageMsgType !== MessageType.BOT
                                            ? [
                                                  ...prevMessages,
                                                  { msg: chunkData.value, msgType: MessageType.BOT }
                                              ]
                                            : [
                                                  ...prevMessages.slice(0, -1),
                                                  {
                                                      msg: lastMessageMsg + chunkData.value,
                                                      msgType: lastMessageMsgType
                                                  }
                                              ];

                                    localStorage.setItem(
                                        "messages",
                                        JSON.stringify(
                                            newMessages.slice(-AMOUNT_OF_MESSAGES_TO_STORE)
                                        )
                                    );

                                    scrollToRef(messagesEndRef.current, {
                                        behavior: "smooth"
                                    });

                                    return newMessages;
                                });
                                await sleep(50);
                            } else if (chunkData.status === "done") {
                                setInputtedMessageState("", false);
                            }
                        }
                    }
                }
            } catch (e) {
                console.error(e);
            }
        };

        if (inputtedMessage) {
            setMessages((prevMessages) => {
                const newMessages = [
                    ...prevMessages,
                    { msg: inputtedMessage, msgType: MessageType.MINE }
                ];
                localStorage.setItem(
                    "messages",
                    JSON.stringify(newMessages.slice(-AMOUNT_OF_MESSAGES_TO_STORE))
                );
                return newMessages;
            });

            scrollToRef(messagesEndRef.current, {
                behavior: "smooth"
            });

            handleBotMessageStream();
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

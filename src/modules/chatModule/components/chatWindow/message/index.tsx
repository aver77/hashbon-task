import { FC } from "react";
import { MessageType } from "shared/models/enums";
import cx from "classnames";

import styles from "./styles.module.scss";
import BotMessage from "./botMessage";
import MyMessage from "./myMessage";

interface IMessage {
    msg: string;
    msgType: MessageType;
}
const Message: FC<IMessage> = ({ msg, msgType }) => {
    const isBotMsg = msgType === MessageType.BOT;

    const message = isBotMsg ? <BotMessage msg={msg} /> : <MyMessage msg={msg} />;

    return (
        <div className={cx(styles.outerContainer, isBotMsg ? styles.bot : styles.my)}>
            <div className={cx(styles.innerContainer, isBotMsg ? styles.bot : styles.my)}>
                {message}
            </div>
        </div>
    );
};
export default Message;

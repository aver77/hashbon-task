import { Circle } from "shared/ui";
import { FC } from "react";
import cx from "classnames";

import styles from "./styles.module.scss";
import robotSvg from "assets/svgs/robot.svg";

interface IMyMessage {
    msg: string;
}
const BotMessage: FC<IMyMessage> = ({ msg }) => {
    return (
        <>
            <p className={cx(styles.message, styles.outgoingMessage)}>{msg}</p>
            {<Circle src={robotSvg} alt={"avatar"} />}
        </>
    );
};
export default BotMessage;

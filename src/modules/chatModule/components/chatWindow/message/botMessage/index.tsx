import { Circle } from "shared/ui";
import { FC } from "react";
import cx from "classnames";

import styles from "./styles.module.scss";
import robotSvg from "assets/svgs/robot.svg";

interface IBotMessage {
    msg: string;
}
const BotMessage: FC<IBotMessage> = ({ msg }) => {
    return (
        <>
            <div className={cx(styles.message, styles.outgoingMessage)}>
                <p>{msg}</p>
            </div>
            {<Circle src={robotSvg} alt={"avatar"} />}
        </>
    );
};
export default BotMessage;

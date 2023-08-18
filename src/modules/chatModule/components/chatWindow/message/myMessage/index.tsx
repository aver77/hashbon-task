import { Circle } from "shared/ui";
import { FC } from "react";
import cx from "classnames";

import styles from "./styles.module.scss";

interface IBotMessage {
    msg: string;
}
const MyMessage: FC<IBotMessage> = ({ msg }) => {
    return (
        <>
            <div className={cx(styles.message)}>{msg}</div>
            {
                <Circle
                    className={styles.circle}
                    customContent={<span className={styles.circleContent}>T</span>}
                />
            }
        </>
    );
};
export default MyMessage;

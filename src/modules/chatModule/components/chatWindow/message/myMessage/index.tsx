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
            <p className={cx(styles.message)}>{msg}</p>
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

import { FC, HTMLAttributes, memo } from "react";
import cx from "classnames";

import styles from "./styles.module.scss";

interface ICircle {
    alt: string;
    src: string;
    customContent: JSX.Element;
}
const Circle: FC<Partial<ICircle> & HTMLAttributes<HTMLDivElement>> = ({
    alt,
    src,
    customContent,
    ...props
}) => {
    const { className, ...restProps } = props;

    const circleContent = customContent ? customContent : <img src={src} alt={alt} />;

    return (
        <div className={cx(styles.circle, className)} {...restProps}>
            {circleContent}
        </div>
    );
};
export default memo(Circle);

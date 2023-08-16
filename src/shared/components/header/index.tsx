import styles from "./styles.module.scss";
import headingSvg from "assets/svgs/heading.svg";
const Header = () => {
    return (
        <div className={styles.container}>
            <img alt={"header logo"} src={headingSvg} />
        </div>
    );
};
export default Header;

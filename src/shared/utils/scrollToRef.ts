type TScrollLogicalPosition = "center" | "end" | "nearest" | "start";
type TScrollBehavior = "auto" | "instant" | "smooth";
interface IScroll {
    behavior: TScrollBehavior;
    block: TScrollLogicalPosition;
    inline: TScrollLogicalPosition;
}

const defaultDelay = 100;
const scrollToRef = (ref: HTMLElement | null, arg?: boolean | Partial<IScroll>): void => {
    if (ref) {
        setTimeout(function () {
            ref.scrollIntoView(arg);
        }, defaultDelay);
    }
};

export default scrollToRef;

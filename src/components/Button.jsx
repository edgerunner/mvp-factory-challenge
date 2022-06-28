import "./Button.css";
import cn from "classnames";

export default function Button({ children, action, icon }) {
    return <button className={cn({ action })} data-icon={icon}>{children}</button>;
} 
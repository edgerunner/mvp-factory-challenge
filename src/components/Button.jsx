import "./Button.css";
import cn from "classnames";

export default function Button({ children, action, icon, onClick }) {
    return <button onClick={onClick} className={cn({ action })} data-icon={icon}>{children}</button>;
} 
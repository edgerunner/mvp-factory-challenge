import "./Button.css";
import cn from "classnames";

export default function Button({ children, action, icon, className, ...props }) {
    return <button {...props} className={cn(className, { action })} data-icon={icon}>{children}</button>;
} 
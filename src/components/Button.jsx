import "./Button.css";
import cn from "classnames";

export default function Button({ children, action }) {
    return <button className={cn({ action })}>{children}</button>;
} 
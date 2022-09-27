import "./Button.css";
import cn from "classnames";
import type { ReactElement } from "react";

type Props = React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
    action?: boolean
    className?: string
    icon?: "calendar" | "down-arrow"
}>

export default function Button({ children, action, icon, className, ...props }: Props): ReactElement {
    return <button {...props} className={cn(className, { action })} data-icon={icon}>{children}</button>;
} 
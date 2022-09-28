import "./Avatar.css";
import cn from "classnames";
import type { ReactElement } from "react";

type Props = { name: string }

export default function Avatar({name}: Props): ReactElement {
    const initials = name.split(" ")
        .map(word => word[0])
        .slice(0, 3)
        .join("");
    const initialsClass = cn("avatar", `initials-${initials.length}`);
    return (
        <span
            className={cn("avatar", initialsClass)}
            title={name}>
            {initials}
        </span>
    );
}
import "./Avatar.css";
import cn from "classnames";

export default function Avatar({name}) {
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
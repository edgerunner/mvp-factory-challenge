import Button from "./Button";
import { useState } from "react";

export default function Menu({ title, children }) {
    const [open, setOpen] = useState(false);
    return (
        <Button icon="down-arrow" onClick={() => setOpen(!open)}>
            {title}
            {open && (<menu>{children}</menu>)}
        </Button>
    );
}

export function Item({ children }) {
    return <li>{children}</li>;
}

Menu.Item = Item;
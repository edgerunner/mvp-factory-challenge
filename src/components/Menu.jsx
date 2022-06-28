import Button from "./Button";
import { useState, Children, cloneElement } from "react";

export default function Menu({ title, children, onSelect }) {
    const [open, setOpen] = useState(false);
    const childrenWithHandlers = Children.map(children, child => 
        cloneElement(child, {
            onClick() { onSelect(child.props.id); }
        })
    );
    return (
        <Button icon="down-arrow" onClick={() => setOpen(!open)}>
            {title}
            {open && (<menu>{childrenWithHandlers}</menu>)}
        </Button>
    );
}

export function Item({ children, onClick }) {
    return <li onClick={onClick}>{children}</li>;
}

Menu.Item = Item;
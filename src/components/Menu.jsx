import Button from "./Button";
import { useState, Children, cloneElement } from "react";
import cn from "classnames";
import "./Menu.css";

export default function Menu({ title, children, onSelect }) {
    const [open, setOpen] = useState(false);
    const childrenWithHandlers = Children.map(children, child => 
        cloneElement(child, {
            onSelect() { 
                child.props.onSelect?.(); 
                onSelect?.(child.props.id);
            }
        })
    );
    return (
        <Button 
            icon="down-arrow" 
            className={cn({ Menu: true, open })} 
            onClick={() => setOpen(!open)}
        >
            {title}
            {open && (<menu>{childrenWithHandlers}</menu>)}
        </Button>
    );
}

export function Item({ children, onSelect }) {
    return <li onClick={onSelect}>{children}</li>;
}

Menu.Item = Item;
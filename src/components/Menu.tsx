import Button from "./Button";
import { useState, Children, cloneElement } from "react";
import cn from "classnames";
import "./Menu.css";
import { useClickOutside } from "src/hooks";

type Props = {
    title: string
    onSelect?(id?: string): void
    children: React.ReactElement<ItemProps, typeof Item>[]
}

export default function Menu({ title, children, onSelect }: Props): React.ReactElement {
    const [open, setOpen] = useState(false);
    useClickOutside(open, () => setOpen(false));

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

type ItemProps = React.PropsWithChildren<{ 
        onSelect(): void
        id?: string
    } | {
        onSelect?(): void
        id: string
    }>

export function Item({ children, onSelect }: ItemProps): React.ReactElement {
    return <li onClick={onSelect}>{children}</li>;
}

Menu.Item = Item;


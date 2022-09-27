import "./Summary.css";

type Props = React.PropsWithChildren

export default function Summary({ children }: Props): React.ReactElement {
    return (
        <footer className="Summary">
            {children}
        </footer>
    );    
}
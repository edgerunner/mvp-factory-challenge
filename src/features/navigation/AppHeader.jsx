import "./AppHeader.css";
import { Avatar } from "/src/components";

export default function AppHeader() {
    return (
        <header id="app-header">
            <a href="#" id="logo" title="BApp">BApp</a>
            <button id="nav-menu">Navigation menu</button>
            <div id="current-user"><Avatar name="John Doe" /> John Doe</div>
        </header>
    );
}
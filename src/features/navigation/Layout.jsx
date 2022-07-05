import "./Layout.css";
import AppHeader from "./AppHeader";
export default function Layout({ children }) {
    return (
        <div id="app">
            <AppHeader />
            <nav 
                id="nav-menu" 
                title="Hey! This is a dummy component until it is implemented">
                    &nbsp;
            </nav>
            
            {children}
            
            <footer id="app-footer">
                <p>
                    Built by <a href="mailto:mert@merttorun.com">Mert Torun</a> in
                    July 2022 for MVP Factory
                </p>
            </footer>
        </div>
    );
}

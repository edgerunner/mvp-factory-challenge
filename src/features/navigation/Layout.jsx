import "./Layout.css";

export default function Layout({ children }) {
    return (
        <div id="app">
            <header id="app-header">
                App header
            </header>
            <nav id="nav-menu">
                Navigation menu
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

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
               App footer
            </footer>
        </div>
    );
}

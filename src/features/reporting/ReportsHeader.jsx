import "./ReportsHeader.css";

export default function ReportsHeader({ children }) {
    return (
        <header id="reports-header">
            <hgroup>
                <h1>Reports</h1>
                <h5>Easily generate a report of your transactions</h5>
            </hgroup>
            {children}
        </header>
    );
}
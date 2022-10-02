import * as React from "react";
import "./ReportsHeader.css";

export default function ReportsHeader({ children }: React.PropsWithChildren) {
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
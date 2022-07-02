import "./Reports.css";

export default function Reports() {
    return <main id="reports">
        <Placeholder />
    </main>;
}

function Placeholder() {
    return (
        <div id="reports-placeholder">
            <hgroup>
                <h1>No reports</h1>
                <h5>
                    Currently you have no data for the reports to be generated.
                    Once you start generating traffic through the Balance 
                    application the reports will be shown.
                </h5>
            </hgroup>
        </div>
    );
}
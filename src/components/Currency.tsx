export default function Currency({ amount, code }) {
    const { format } = new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return <data value={amount}>{format(amount)} {code}</data>;
}
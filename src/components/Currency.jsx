export default function Currency({ amount, code }) {
    return <data value={amount}>{amount} {code}</data>;
}
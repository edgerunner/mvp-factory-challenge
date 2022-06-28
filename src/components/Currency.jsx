export default function Currency({ amount, code }) {
    return <data value={amount}>{Math.round(amount)} {code}</data>;
}
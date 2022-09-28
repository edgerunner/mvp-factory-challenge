import type { ReactElement } from "react";

type Props = {
    amount: number
    code: "USD" | "EUR" | "JPY"
}

export default function Currency({ amount, code }: Props): ReactElement {
    const { format } = new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return <data value={amount}>{format(amount)} {code}</data>;
}
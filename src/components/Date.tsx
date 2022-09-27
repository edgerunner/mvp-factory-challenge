import type { ReactElement } from "react";

const { format } = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric" 
});

type Props = { date: Date }

export default function Date({ date }: Props): ReactElement {
    return <time dateTime={date.toISOString()}>{format(date)}</time>;
}
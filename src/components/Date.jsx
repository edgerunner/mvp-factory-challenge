const { format } = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric" 
});

export default function Date({ date }) {
    return <time>{format(date)}</time>;
}
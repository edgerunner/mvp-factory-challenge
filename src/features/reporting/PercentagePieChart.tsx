import { ResponsiveContainer, PieChart, Pie, Cell, LabelList, Legend } from "recharts";
import type { LegendProps } from "recharts/types"
import "./PercentagePieChart.css";

const { format } = new Intl.NumberFormat("en-US", { style: "percent" });

export default function PercentagePieChart({ data }: { data: { name: string, total: number}[]}) {
    const total = data.reduce((sum, entity) => sum + entity.total, 0);
    return (
        <ResponsiveContainer width="100%" height={500}>
            <PieChart width={400} height={400}>
                <Legend 
                    verticalAlign="top" 
                    content={CustomLegend as React.ComponentProps<typeof Legend>["content"]}
                />
                <Pie
                    data={data}
                    dataKey="total"
                    nameKey="name"
                    outerRadius={150} innerRadius={60}
                    isAnimationActive={false} 
                >
                    <LabelList 
                        position="inside"
                        fill="white"
                        stroke="none"
                        dataKey="total"
                        formatter={(amount: number) => format(amount / total)}
                    />
                    <Cell fill="#A259FF" />
                    <Cell fill="#F24E1E" />
                    <Cell fill="#FFC107" />
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}


function CustomLegend({ payload: entities }: LegendProps) {
    if (!entities) return
    return (
        <ul className="legend">
            {entities.map(({ value, color: backgroundColor }) => 
                <li key={value}>
                    <span style={{backgroundColor}}>&nbsp;</span> {value}
                </li>    
            )}
        </ul>
    );
    
}
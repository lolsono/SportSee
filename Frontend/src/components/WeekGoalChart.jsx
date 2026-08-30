import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function WeekGoalChart() {

    const data = [
        {
            name: "4 réalisées",
            value: 4
        },
        {
            name: "2 restants",
            value: 2
        }
    ];

    const COLORS = ["#1717F5", "#B6BDFC"];

    return (
        <div className="weekGoal-chart">

            <ResponsiveContainer width="100%" height={220}>
                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={62}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={0}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index]}
                            />
                        ))}
                    </Pie>

                </PieChart>
            </ResponsiveContainer>

            <div className="weekGoal-legend">

                <p>
                    <span className="legend-dot done"></span>
                    4 réalisées
                </p>

                <p>
                    <span className="legend-dot remaining"></span>
                    2 restants
                </p>

            </div>

        </div>
    );
}

export default WeekGoalChart;

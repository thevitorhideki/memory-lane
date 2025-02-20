"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function PieChartWidget({ data, dataKey, nameKey }: any) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#82ca9d"
          label
        ></Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

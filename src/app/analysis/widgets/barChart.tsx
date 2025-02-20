'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function BarChartWidget({
  data,
  dataKey,
  nameKey,
  grid = false,
  xaxis = false,
  yaxis = false,
  legend = false,
  tooltip = false,
}: any) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        {grid && <CartesianGrid strokeDasharray="1 1" />}
        {xaxis && <XAxis dataKey={nameKey} />}
        {yaxis && <YAxis width={30} tick={{ fontSize: 10, dy: 0 }} />}
        {tooltip && <Tooltip />}
        {legend && <Legend />}
        <Bar dataKey={dataKey} fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

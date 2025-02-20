'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function LineChartWidget({
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
      <LineChart data={data}>
        {grid && <CartesianGrid strokeDasharray="3 3" />}
        {xaxis && (
          <XAxis dataKey={nameKey} width={30} tick={{ fontSize: 10 }} />
        )}
        {yaxis && <YAxis width={30} tick={{ fontSize: 10, dy: 0 }} />}
        {tooltip && <Tooltip />}
        {legend && <Legend />}
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#82ca9d"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

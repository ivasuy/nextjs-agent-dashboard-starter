/* eslint-disable react/no-array-index-key -- Pie chart cells are static and keyed by position */
'use client';

import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { CHART_COLORS, CHART_DEFAULTS } from '@/lib/chart';

interface PieChartProps {
  data: Record<string, unknown>[];
  dataKey: string;
  nameKey: string;
  colors?: string[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export function PieChart({
  data,
  dataKey,
  nameKey,
  colors = CHART_COLORS.palette as unknown as string[],
  height = 300,
  innerRadius = 0,
  outerRadius = 100,
}: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={CHART_DEFAULTS.tooltipStyle} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

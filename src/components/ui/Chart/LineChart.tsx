'use client';

import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { CHART_COLORS, CHART_DEFAULTS } from '@/lib/chart';

interface LineChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
}

export function LineChart({
  data,
  xKey,
  yKey,
  color = CHART_COLORS.primary,
  height = 300,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={CHART_DEFAULTS.margin}>
        <CartesianGrid
          strokeDasharray={CHART_DEFAULTS.gridStrokeDasharray}
          stroke={CHART_DEFAULTS.gridStroke}
        />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={CHART_DEFAULTS.tooltipStyle} />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={CHART_DEFAULTS.strokeWidth}
          dot={{ r: CHART_DEFAULTS.dotRadius, fill: color }}
          activeDot={{ r: CHART_DEFAULTS.dotRadius + 2 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

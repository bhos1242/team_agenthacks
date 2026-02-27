"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart as RechartsAreaChart,
  Area,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface ChartProps {
  data: Record<string, unknown>[];
  className?: string;
}
interface BarChartProps extends ChartProps {
  dataKey: string;
  xAxisKey: string;
  barColor?: string;
}

interface LineChartProps extends ChartProps {
  dataKey: string;
  xAxisKey: string;
  lineColor?: string;
}

interface PieChartProps extends ChartProps {
  dataKey: string;
  nameKey: string;
}

interface AreaChartProps extends ChartProps {
  dataKey: string;
  xAxisKey: string;
  areaColor?: string;
}

export function BarChart({
  data,
  dataKey,
  xAxisKey,
  barColor = "#8884d8",
  className,
}: BarChartProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight={0}
      className={className}
    >
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill={barColor} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

// ChartComponent was a placeholder, correcting types in exports below instead

export function LineChart({
  data,
  dataKey,
  xAxisKey,
  lineColor = "#8884d8",
  className,
}: LineChartProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight={0}
      className={className}
    >
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke={lineColor} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export function PieChart({ data, dataKey, nameKey, className }: PieChartProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight={0}
      className={className}
    >
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry: Record<string, unknown>, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

export function AreaChart({
  data,
  dataKey,
  xAxisKey,
  areaColor = "#8884d8",
  className,
}: AreaChartProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight={0}
      className={className}
    >
      <RechartsAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={areaColor}
          fill={areaColor}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}

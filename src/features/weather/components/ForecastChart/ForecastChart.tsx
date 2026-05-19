import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import styles from './ForecastChart.module.scss';

interface ChartPoint {
  label: string;
  temperature: number;
}

interface ForecastChartProps {
  data: ChartPoint[];
}

export const ForecastChart = ({ data }: ForecastChartProps) => {
  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -16 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `${Math.round(value)}°`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
            formatter={(value: number) => [`${Math.round(value)}°C`, 'Temperature']}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 3, fill: '#2563eb' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

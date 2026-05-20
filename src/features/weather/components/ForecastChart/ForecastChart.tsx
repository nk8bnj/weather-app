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
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 12, right: 12, bottom: 8, left: -16 }}>
          <CartesianGrid stroke="#1a1410" strokeDasharray="4 4" vertical={false} opacity={0.2} />
          <XAxis
            dataKey="label"
            stroke="#1a1410"
            fontSize={12}
            fontWeight={700}
            tickLine={false}
            axisLine={{ stroke: '#1a1410', strokeWidth: 2 }}
          />
          <YAxis
            stroke="#1a1410"
            fontSize={12}
            fontWeight={700}
            tickLine={false}
            axisLine={{ stroke: '#1a1410', strokeWidth: 2 }}
            tickFormatter={(value: number) => `${Math.round(value)}°`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '2px solid #1a1410',
              borderRadius: '6px',
              boxShadow: '4px 4px 0 #1a1410',
              fontSize: '0.875rem',
              fontWeight: 700,
            }}
            formatter={(value) => {
              const temperature = Number(value);

              return [
                Number.isFinite(temperature) ? `${Math.round(temperature)}°C` : '',
                'Temperature',
              ];
            }}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#1a1410"
            strokeWidth={3}
            dot={{ r: 5, fill: '#ff6b1a', stroke: '#1a1410', strokeWidth: 2 }}
            activeDot={{ r: 7, fill: '#ff6b1a', stroke: '#1a1410', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

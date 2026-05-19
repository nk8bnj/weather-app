import type { ForecastPoint } from '../api';

export interface HourlyForecastItem {
  timestamp: number;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  iconCode: string;
}

export interface DailyForecastItem {
  date: string; // YYYY-MM-DD
  timestamp: number; // representative timestamp (midday)
  temperatureMin: number;
  temperatureMax: number;
  temperatureAvg: number;
  humidity: number;
  windSpeed: number;
  description: string;
  iconCode: string;
}

const HOURS_24 = 24 * 60 * 60;

export const getHourlyForecast = (
  points: ForecastPoint[],
  fromTimestamp: number = Math.floor(Date.now() / 1000),
): HourlyForecastItem[] => {
  const cutoff = fromTimestamp + HOURS_24;
  return points
    .filter((point) => point.timestamp <= cutoff)
    .map((point) => ({
      timestamp: point.timestamp,
      temperature: point.temperature,
      feelsLike: point.feelsLike,
      humidity: point.humidity,
      windSpeed: point.windSpeed,
      description: point.description,
      iconCode: point.iconCode,
    }));
};

const toDateKey = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const pickRepresentative = (points: ForecastPoint[]): ForecastPoint => {
  // Pick the point closest to local midday (12:00) for the icon/description.
  let best = points[0]!;
  let bestDistance = Infinity;
  for (const point of points) {
    const hour = new Date(point.timestamp * 1000).getHours();
    const distance = Math.abs(hour - 12);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = point;
    }
  }
  return best;
};

export const getDailyForecast = (points: ForecastPoint[]): DailyForecastItem[] => {
  const groups = new Map<string, ForecastPoint[]>();
  for (const point of points) {
    const key = toDateKey(point.timestamp);
    const group = groups.get(key);
    if (group) {
      group.push(point);
    } else {
      groups.set(key, [point]);
    }
  }

  const result: DailyForecastItem[] = [];
  for (const [date, dayPoints] of groups) {
    const temps = dayPoints.map((point) => point.temperature);
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    const avg = temps.reduce((sum, value) => sum + value, 0) / temps.length;
    const humidities = dayPoints.map((point) => point.humidity);
    const avgHumidity = humidities.reduce((sum, value) => sum + value, 0) / humidities.length;
    const winds = dayPoints.map((point) => point.windSpeed);
    const avgWind = winds.reduce((sum, value) => sum + value, 0) / winds.length;
    const representative = pickRepresentative(dayPoints);

    result.push({
      date,
      timestamp: representative.timestamp,
      temperatureMin: min,
      temperatureMax: max,
      temperatureAvg: avg,
      humidity: Math.round(avgHumidity),
      windSpeed: avgWind,
      description: representative.description,
      iconCode: representative.iconCode,
    });
  }

  return result.slice(0, 5);
};

import { useMemo, useState } from 'react';

import type { Forecast } from '../../api';
import { getDailyForecast, getHourlyForecast } from '../../lib/aggregateForecast';
import { ForecastChart } from '../ForecastChart';
import {
  formatHour,
  formatTemperature,
  formatWeekday,
  getWeatherIconUrl,
} from '@/shared/lib/formatters';

import styles from './ForecastSection.module.scss';

type ForecastMode = 'hourly' | 'daily';

interface ForecastSectionProps {
  forecast: Forecast;
}

export const ForecastSection = ({ forecast }: ForecastSectionProps) => {
  const [mode, setMode] = useState<ForecastMode>('hourly');

  const hourly = useMemo(() => getHourlyForecast(forecast.points), [forecast]);
  const daily = useMemo(() => getDailyForecast(forecast.points), [forecast]);

  const chartData = useMemo(() => {
    if (mode === 'hourly') {
      return hourly.map((item) => ({
        label: formatHour(item.timestamp),
        temperature: item.temperature,
      }));
    }

    return daily.map((item) => ({
      label: formatWeekday(item.timestamp),
      temperature: item.temperatureAvg,
    }));
  }, [mode, hourly, daily]);

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h3 className={styles.title}>Forecast</h3>
        <div className={styles.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'hourly'}
            className={`${styles.tab} ${mode === 'hourly' ? styles.active : ''}`}
            onClick={() => setMode('hourly')}
          >
            Next 24 hours
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'daily'}
            className={`${styles.tab} ${mode === 'daily' ? styles.active : ''}`}
            onClick={() => setMode('daily')}
          >
            5 days
          </button>
        </div>
      </header>

      <ForecastChart data={chartData} />

      {mode === 'hourly' ? (
        <ul className={styles.list}>
          {hourly.map((item) => (
            <li key={item.timestamp} className={styles.item}>
              <span className={styles.itemLabel}>{formatHour(item.timestamp)}</span>
              <img
                src={getWeatherIconUrl(item.iconCode)}
                alt={item.description}
                className={styles.itemIcon}
                width={40}
                height={40}
              />
              <span className={styles.itemTemp}>{formatTemperature(item.temperature)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.list}>
          {daily.map((item) => (
            <li key={item.date} className={styles.item}>
              <span className={styles.itemLabel}>{formatWeekday(item.timestamp)}</span>
              <img
                src={getWeatherIconUrl(item.iconCode)}
                alt={item.description}
                className={styles.itemIcon}
                width={40}
                height={40}
              />
              <span className={styles.itemTempRange}>
                <span className={styles.itemTempMax}>{formatTemperature(item.temperatureMax)}</span>
                <span className={styles.itemTempMin}>{formatTemperature(item.temperatureMin)}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

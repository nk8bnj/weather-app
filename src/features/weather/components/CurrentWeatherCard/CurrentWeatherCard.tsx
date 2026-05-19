import type { CurrentWeather } from '../../api';
import {
  capitalize,
  formatHumidity,
  formatTemperature,
  formatWindSpeed,
  getWeatherIconUrl,
} from '@/shared/lib/formatters';
import styles from './CurrentWeatherCard.module.scss';

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
}

export const CurrentWeatherCard = ({ weather }: CurrentWeatherCardProps) => {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.cityName}>
          {weather.cityName}
          <span className={styles.country}>, {weather.country}</span>
        </h2>
        <p className={styles.description}>{capitalize(weather.description)}</p>
      </header>

      <div className={styles.main}>
        <img
          src={getWeatherIconUrl(weather.iconCode)}
          alt={weather.description}
          className={styles.icon}
          width={96}
          height={96}
        />
        <div className={styles.temperature}>{formatTemperature(weather.temperature)}</div>
      </div>

      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Feels like</dt>
          <dd className={styles.statValue}>{formatTemperature(weather.feelsLike)}</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Humidity</dt>
          <dd className={styles.statValue}>{formatHumidity(weather.humidity)}</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Wind</dt>
          <dd className={styles.statValue}>{formatWindSpeed(weather.windSpeed)}</dd>
        </div>
      </dl>
    </article>
  );
};

import { useState } from 'react';
import { CitySearch } from '@/features/city-search';
import type { CityLocation } from '@/features/city-search';
import { CurrentWeatherCard, useCurrentWeather } from '@/features/weather';
import { Spinner, ErrorMessage } from '@/shared/ui';
import styles from './Layout.module.scss';

export const Layout = () => {
  const [selectedCity, setSelectedCity] = useState<CityLocation | null>(null);

  const {
    data: weather,
    isLoading,
    isError,
    error,
  } = useCurrentWeather({
    lat: selectedCity?.lat ?? null,
    lon: selectedCity?.lon ?? null,
  });

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>Weather</h1>
      </header>

      <div className={styles.search}>
        <CitySearch onSelect={setSelectedCity} />
      </div>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Favorites</h2>
          <p className={styles.placeholder}>No favorites yet.</p>
        </aside>

        <main className={styles.main}>
          {!selectedCity && (
            <p className={styles.placeholder}>Use the search above to find weather for any city.</p>
          )}

          {selectedCity && isLoading && (
            <div className={styles.centered}>
              <Spinner size="lg" />
            </div>
          )}

          {selectedCity && isError && (
            <ErrorMessage title="Could not load weather">
              {error instanceof Error ? error.message : 'Something went wrong.'}
            </ErrorMessage>
          )}

          {weather && <CurrentWeatherCard weather={weather} />}
        </main>
      </div>
    </div>
  );
};

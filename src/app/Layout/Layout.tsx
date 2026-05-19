import { CitySearch } from '@/features/city-search';
import {
  CurrentWeatherCard,
  ForecastSection,
  useCurrentWeather,
  useForecast,
} from '@/features/weather';
import { FavoriteToggleButton, FavoritesList, useFavorites } from '@/features/favorites';
import { useSelectedCity } from '@/shared/lib/hooks';
import { Spinner, ErrorMessage } from '@/shared/ui';
import styles from './Layout.module.scss';

export const Layout = () => {
  const { selectedCity, setSelectedCity } = useSelectedCity();
  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites();

  const lat = selectedCity?.lat ?? null;
  const lon = selectedCity?.lon ?? null;

  const {
    data: weather,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
    error: weatherError,
  } = useCurrentWeather({ lat, lon });

  const { data: forecast } = useForecast({ lat, lon });

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
          <FavoritesList
            favorites={favorites}
            selectedCity={selectedCity}
            onSelect={setSelectedCity}
            onRemove={removeFavorite}
          />
        </aside>

        <main className={styles.main}>
          {!selectedCity && (
            <p className={styles.placeholder}>Use the search above to find weather for any city.</p>
          )}

          {selectedCity && isWeatherLoading && (
            <div className={styles.centered}>
              <Spinner size="lg" />
            </div>
          )}

          {selectedCity && isWeatherError && (
            <ErrorMessage title="Could not load weather">
              {weatherError instanceof Error ? weatherError.message : 'Something went wrong.'}
            </ErrorMessage>
          )}

          {weather && selectedCity && (
            <div className={styles.weatherSection}>
              <div className={styles.weatherHeader}>
                <FavoriteToggleButton
                  isFavorite={isFavorite(selectedCity)}
                  onToggle={() => toggleFavorite(selectedCity)}
                />
              </div>
              <CurrentWeatherCard weather={weather} />
              {forecast && <ForecastSection forecast={forecast} />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

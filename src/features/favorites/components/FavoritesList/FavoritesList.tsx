import type { CityLocation } from '@/features/city-search';
import { cityId } from '../../storage';
import styles from './FavoritesList.module.scss';

interface FavoritesListProps {
  favorites: CityLocation[];
  selectedCity: CityLocation | null;
  onSelect: (city: CityLocation) => void;
  onRemove: (city: CityLocation) => void;
}

export const FavoritesList = ({
  favorites,
  selectedCity,
  onSelect,
  onRemove,
}: FavoritesListProps) => {
  if (favorites.length === 0) {
    return <p className={styles.empty}>No favorites yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {favorites.map((city) => {
        const isActive = selectedCity ? cityId(selectedCity) === cityId(city) : false;
        return (
          <li key={cityId(city)} className={styles.item}>
            <button
              type="button"
              className={`${styles.cityButton} ${isActive ? styles.active : ''}`}
              onClick={() => onSelect(city)}
            >
              <span className={styles.cityName}>{city.name}</span>
              <span className={styles.cityMeta}>
                {[city.state, city.country].filter(Boolean).join(', ')}
              </span>
            </button>
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => onRemove(city)}
              aria-label={`Remove ${city.name} from favorites`}
            >
              ✕
            </button>
          </li>
        );
      })}
    </ul>
  );
};

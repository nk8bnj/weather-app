import type { CityLocation } from '@/features/city-search';

const STORAGE_KEY = 'weather-app:favorites';

export const cityId = (city: Pick<CityLocation, 'lat' | 'lon'>): string => {
  return `${city.lat.toFixed(4)},${city.lon.toFixed(4)}`;
};

export const loadFavorites = (): CityLocation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CityLocation =>
        item &&
        typeof item.name === 'string' &&
        typeof item.country === 'string' &&
        typeof item.lat === 'number' &&
        typeof item.lon === 'number',
    );
  } catch {
    return [];
  }
};

export const saveFavorites = (favorites: CityLocation[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Storage may be unavailable (private mode, quota); ignore silently.
  }
};

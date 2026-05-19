import { useCallback, useEffect, useState } from 'react';
import type { CityLocation } from '@/features/city-search';
import { cityId, loadFavorites, saveFavorites } from '../storage';

interface UseFavoritesResult {
  favorites: CityLocation[];
  isFavorite: (city: Pick<CityLocation, 'lat' | 'lon'>) => boolean;
  addFavorite: (city: CityLocation) => void;
  removeFavorite: (city: Pick<CityLocation, 'lat' | 'lon'>) => void;
  toggleFavorite: (city: CityLocation) => void;
}

export const useFavorites = (): UseFavoritesResult => {
  const [favorites, setFavorites] = useState<CityLocation[]>(() => loadFavorites());

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const isFavorite = useCallback(
    (city: Pick<CityLocation, 'lat' | 'lon'>) => {
      const target = cityId(city);
      return favorites.some((favorite) => cityId(favorite) === target);
    },
    [favorites],
  );

  const addFavorite = useCallback((city: CityLocation) => {
    setFavorites((current) => {
      if (current.some((favorite) => cityId(favorite) === cityId(city))) {
        return current;
      }
      return [...current, city];
    });
  }, []);

  const removeFavorite = useCallback((city: Pick<CityLocation, 'lat' | 'lon'>) => {
    const target = cityId(city);
    setFavorites((current) => current.filter((favorite) => cityId(favorite) !== target));
  }, []);

  const toggleFavorite = useCallback((city: CityLocation) => {
    setFavorites((current) => {
      const target = cityId(city);
      if (current.some((favorite) => cityId(favorite) === target)) {
        return current.filter((favorite) => cityId(favorite) !== target);
      }
      return [...current, city];
    });
  }, []);

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
};

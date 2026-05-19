import { useCallback, useEffect, useState } from 'react';
import type { CityLocation } from '@/features/city-search';

const PARAM_KEYS = {
  name: 'city',
  country: 'country',
  state: 'state',
  lat: 'lat',
  lon: 'lon',
} as const;

const readFromUrl = (): CityLocation | null => {
  const params = new URLSearchParams(window.location.search);
  const name = params.get(PARAM_KEYS.name);
  const country = params.get(PARAM_KEYS.country);
  const lat = params.get(PARAM_KEYS.lat);
  const lon = params.get(PARAM_KEYS.lon);

  if (!name || !country || !lat || !lon) return null;

  const latNum = Number.parseFloat(lat);
  const lonNum = Number.parseFloat(lon);
  if (Number.isNaN(latNum) || Number.isNaN(lonNum)) return null;

  const state = params.get(PARAM_KEYS.state);
  return {
    name,
    country,
    state: state ?? undefined,
    lat: latNum,
    lon: lonNum,
  };
};

const writeToUrl = (city: CityLocation | null): void => {
  const params = new URLSearchParams(window.location.search);

  if (!city) {
    params.delete(PARAM_KEYS.name);
    params.delete(PARAM_KEYS.country);
    params.delete(PARAM_KEYS.state);
    params.delete(PARAM_KEYS.lat);
    params.delete(PARAM_KEYS.lon);
  } else {
    params.set(PARAM_KEYS.name, city.name);
    params.set(PARAM_KEYS.country, city.country);
    if (city.state) {
      params.set(PARAM_KEYS.state, city.state);
    } else {
      params.delete(PARAM_KEYS.state);
    }
    params.set(PARAM_KEYS.lat, city.lat.toString());
    params.set(PARAM_KEYS.lon, city.lon.toString());
  }

  const query = params.toString();
  const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, '', newUrl);
};

interface UseSelectedCityResult {
  selectedCity: CityLocation | null;
  setSelectedCity: (city: CityLocation | null) => void;
}

export const useSelectedCity = (): UseSelectedCityResult => {
  const [selectedCity, setSelectedCityState] = useState<CityLocation | null>(() => readFromUrl());

  useEffect(() => {
    writeToUrl(selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    const handlePopState = () => {
      setSelectedCityState(readFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const setSelectedCity = useCallback((city: CityLocation | null) => {
    setSelectedCityState(city);
  }, []);

  return { selectedCity, setSelectedCity };
};
